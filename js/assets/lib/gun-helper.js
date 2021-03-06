/**
 * get and put encrypted and/or signed material to paths in Gun
 * FIXME: Investigate why root level put doesn't work
 *
 * DONE: Add signing to make objects unwritable by others
 * Changes:
 * - 25.02.2020
 * - added mergedeep to better merge deeper objects between themselves
 * - added pair.osign option to only sign not encrypt when passing existing pairs
 **/

(async function(){
var Nug = this.Nug = null;

var atoob = this.atoob = function atoob(arr){
  var obj = {};
  Gun.list.map(arr, function(v,f,t){
    if(Gun.list.is(v) || Gun.obj.is(v)){
      obj[f] = atoob(v);
      return;
    }
    obj[f] = v;
  });
  return obj;
};

const getNug = this.getNug = function(){
  if(Nug) return Nug.back(-1);
  if(Gun) Nug = new Gun(location.protocol+"//"+location.host+"/gun");
  return Nug.back(-1);
}
const mrgdeep = this.mrgdeep = function mrgdeep(...objects) {
  const isObject = obj => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = [...pVal, ...oVal].filter((element, index, array) => array.indexOf(element) === index);
      }
      else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mrgdeep(pVal, oVal);
      }
      else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

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

const createRWEResource = this.createRWEResource = async(...args)=> {
  let key = args.shift();  // key
  let data = args.shift(); // data
  let encIt = args.length>0 ? args.shift() : false; // encrypt or not?
  let addUuid = args.length>0 ? args.shift() : false; //add uuid or not?

  const uuid = gun._.opt.uuid(); //generate UUID

  let pair = await SEA.pair(); //new PAIR

  if (typeof(encIt) == "object" && encIt.priv) { // if we got a private key

    pair = encIt; //it's the pair

    var onlysign = pair.osign? true:false; //if pair is to only sign, we remember it

    if(pair.hasOwnProperty('osign')) delete pair["osign"]; //clear the pair from the sign flag

    if(onlysign) encIt = false; // if only signing – so don't ecnrypt
  }

  let id = "~"+pair.pub; // pair.pub – like a user name

  if(addUuid) id = id + "." + uuid; // add UUID if needed

  let nug = getNug(); //get a clean Gun without logged in user

  if(!encIt){ // if we don't want to encrypt

    let datax = {"#":id,'.':key,':':data,'>':Gun.state()} // a basic node structure is set

    let signed = await SEA.sign(datax,pair); // it is signed

    let putsi = await nug.get(id).get(key).put(signed).then(); //we put it into a shadow Gun

    console.log("putsi",putsi);

    return {id:id,key:key,ref:nug.get(id).get(key),pair:pair};// gives all info back to use later
  }
  else {
    return await decEnc(data,pair,"encrypt").then(async(enc)=>{
      let datax = {"#":id,'.':key,':':'a'+enc,'>':Gun.state()}
      let signed = await SEA.sign(datax,pair);
      console.log(pair,signed);
      let putsi = await nug.get(id).get(key).put(signed).then()
      console.log("putsi",putsi);
      return {id:id,key:key,ref:nug.get(id).get(key),pair:pair};
    });
  }
};

Gun.chain.putsenc = async function(){
  let args = Array.from(arguments);
  let self = this;
  let gun = this.back(-1);
  let data = args.shift();
  let pair = args.length > 0 ? args.shift() : (gun.user().is ? gun.user()._.sea : null);
  let genuuid = args.length > 0 ? args.shift() : false;
  let onlysign = args.length > 0 ? args.shift() : false;
  if(!pair) return Promise.reject("No keypair provided or not logged in");
  if(onlysign) pair.osign=true;
  return self.once(async function(olddata,key) {
    return await createRWEResource(key, data, pair, genuuid);
  });
};

Gun.chain.putenc = async function() {
  let args = Array.from(arguments);
  let self = this;
  let gun = this.back(-1);
  let nug = getNug();
  let data = args.shift();
  let me = gun.user().is;
  let pair = args.length > 0 ? args.shift() : me ? gun.user()._.sea : null;
  let onlysign = args.length > 0 ? args.shift() : false;

  //TODO: Implement checking with old pair as well as throw if error
  if (!pair) return Promise.reject("No keypair provided or not logged in");
  if(onlysign) pair.osign = true;
  return this.once(async function(olddata, key) {
    console.log("old data", olddata);
    //TODO: Check the onlysign and skip decrypt and encrypt in that case
    if(typeof olddata === "string" && /^(aSEA)/.test(olddata)) olddata = olddata.slice(1)
    return await decEnc(olddata, pair)
      .then(async old => {
        console.log("old", old);
        var nd = null;
        if (!old) {
          nd = data;
        } else {
          if (typeof old === "object" && data && typeof data ==="object") {
            // trying to simulate regular put
            nd = mrgdeep(old, data);
          } else {
            nd = data;
          }
        }
        console.log("new data", nd);
        return await decEnc(nd, pair, "encrypt").then(async (enc) => {
          console.log("encrypted", enc);
          if (!me && pair && pair.priv) {
            let id = "~"+pair.pub;
            let signed = await SEA.sign(
              {
                "#": id,
                ".": key,
                ":": "a"+enc,
                ">": Gun.state()
              },
              pair
            );
            console.log("signed",signed);
            return await nug.get(id).get(key).put(signed).then();
          } else {
            return await self.put("a"+enc).then();
          }
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
  return dec ? dec : null;
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


})();
