/**
 * get and put encrypted material to paths in Gun
 * FIXME: Investigate why root level put doesn't work
 * TODO: Add signing to make objects unwritable by others
 https://gist.github.com/jabis/a3b7d5b475ef23fb859d3acabe9325cb#file-gun-helper-js-L24-L52
 **/

const decEnc = this.decEnc = async(...args)=> {
  console.log(args);
  let data = args.length > 0 ? args.shift() : false; // data as first argument
  let pair = args.length > 0 ? args.shift() : false; // pair to use in decrypting/encrypting as second argument
  let mode = args.length > 0 ? args.shift() : "decrypt"; // mode optional encrypt/decrypt on SEA defaults to decrypt
  //TODO return Promise.reject if we don't have all mandatory arguments passed
  let secret = await SEA.secret(pair.epub, pair);
  let it = await SEA[mode](data, secret);
  return it;
};

const getNug = function(){
  Nug = Nug ? Nug : false;
  if(gun && !Nug) Nug = new Gun({peers:Object.keys(gun._.opt.peers)});
  return Nug.back(-1);
}
// TODO: make compatible with putenc
const createRWEResource = this.createRWEResource = async(...args)=> {
  let key = args.shift();
  let data = args.shift();
  let encIt = args.length>0 ? args.shift() : false;
  let addUuid = args.length>0 ? args.shift() : false;
  const uuid = gun._.opt.uuid();
  let pair = await SEA.pair();
  if(typeof encIt === "object" && encIt.priv) pair = encIt;
  let id = "~"+pair.pub;
  if(addUuid) id = id + "." + uuid;
  let nug = getNug();
  if(!encIt){
    let datax = {"#":id,'.':key,':':data,'>':Gun.state()}
    let signed = await SEA.sign(datax,pair);
    let putsi = await nug.get(id).get(key).put(signed).then();
    //console.log("putsi",putsi);
    return {id:id,key:key,ref:nug.get(id).get(key),pair:pair};
  }
  else {
    return await decEnc(data,pair,"encrypt").then(async(enc)=>{
      let datax = {"#":id,'.':key,':':'a'+enc,'>':Gun.state()}
      let signed = await SEA.sign(datax,pair);
      //console.log(pair,signed);
      let putsi = await nug.get(id).get(key).put(signed).then()
      //console.log("putsi",putsi);
      return {id:id,key:key,ref:nug.get(id).get(key),pair:pair};
    });
  }
};



Gun.chain.putsenc = async function(){
  let args = Array.from(arguments);
  let self = this;
  let gun = this.back(-1);
  let data = args.shift();
  let pair = args.length > 0 ? args.shift() : (gun.user().is ? gun.user()._.sea : null)
  if(!pair) return Promise.reject("No keypair provided or not logged in");
  return await decEnc(data, pair, 'encrypt').then(async (d)=>{
    return await self.put("a"+d).then();
  }).catch((err)=>{
    console.log("whoops",err);
    return self;
  })
};
Gun.chain.putenc = async function() {
  let args = Array.from(arguments);
  let self = this;
  let gun = this.back(-1);
  let nug = getNug();
  let data = args.shift();
  let pair =
    args.length > 0 ? args.shift() : gun.user().is ? gun.user()._.sea : null;
  //TODO: Implement checking with old pair as well as throw if error
  if (!pair) return Promise.reject("No keypair provided or not logged in");
  return this.once(async function(olddata, key) {
    console.log("old data", olddata);
    if(typeof olddata === "string" && /^(aSEA)/.test(olddata)) olddata = olddata.slice(1)
    return await decEnc(olddata, pair)
      .then(async old => {
        console.log("old", old);
        var nd = null;
        if (!old) {
          nd = data;
        } else {
          if (typeof old === "object") {
            // trying to simulate regular put
            nd = Object.assign({}, old, data);
          } else {
            nd = data;
          }
        }
        console.log("new data", nd);
        return await decEnc(nd, pair, "encrypt").then(async (enc) => {
          console.log("encrypted", enc);
/*          if (pair && pair.priv) {
            enc = await Gun.SEA.sign(
              {
                "#": "~"+pair.pub+"|"+key,
                ".": key,
                ":": enc,
                ">": Gun.state()
              },
              pair
            );
            console.log("signed",signed);
          }*/
          return await self.put("a"+enc).then();
        });
      })
      .catch(err => {
        console.log("whoops", err);
        return gun;
      });
  });
};

Gun.chain.getenc = async function(){
  let args = Array.from(arguments);
  let self = this;
  let gun = this.back(-1);
  let path = args.shift();
  let pair = args.length > 0 ? args.shift() : (gun.user().is ? gun.user()._.sea : null)
  if(!pair) return Promise.reject("No keypair provided or not logged in");
  let data = await this.get(path).then();
  //console.log(data,pair,path);
  if(typeof data === "string" && /^(aSEA)/.test(data)) data = data.slice(1)
  let dec = await decEnc(data, pair);
  return dec ? dec : self;
};

const putMyDataEnc = this.putMyDataEnc = async (...args) => {
  //let args = arguments; Array.from(arguments);
  console.log(args);
  let cb = false;
  if(args && args.length > 0 && typeof args[args.length-1] === "function"){
    cb = args.pop(); // if we have a cb function in last of the list, then pop that
  }
  let path = args.length > 0 ? args.shift() : false; // path as first argument
  let data = args.length > 0 ? args.shift() : false; // data as second argument
  let pair = args.length > 0 ? args.shift() : false; // pair optional pair to use in encrypting
  if(!path || !data) return Promise.reject("No path or data!");
  const me = gun.user();
  if (me.is) {
    //authenticated
    const mypair = me._.sea;
    let usePair = mypair;
    if(pair && pair.epub && pair.epriv) usePair = pair;
    let enc = await decEnc(data, usePair,"encrypt");
    if (cb) {
      return me
        .get(path)
        .put(enc,cb)
    } else {
      return await me
        .get(path)
        .put(enc)
        .then();
    }
  } else {
    return Promise.reject("Not authenticated");
  }
};


const getMyDataEnc = this.getMyDataEnc = async (...args)=>{
  console.log(args);
  let path = args.shift(); // path as first argument
  let pair = args.length > 0 ? args.shift() : false; // optional pair to decrypt with
  const me = gun.user();
  if(me.is) {  //authenticated
    const mypair =  me._.sea;
    let usePair = mypair;
    if(pair && pair.epub && pair.epriv) usePair = pair;
    let data = await me
      .get(path)
      .then()
    //console.log(data);
    let dec = await decEnc(data, usePair)
    return dec;
  } else {
    return Promise.reject("Not authenticated")
  }
};
