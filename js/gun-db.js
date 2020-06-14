const gun = new Gun(['https://gun-feeds.glitch.me/gun'])

Gun.SEA.throw = true;

let path = 'defucc'

Vue.prototype.$path = path
Vue.prototype.$gun = gun.get(path);
Vue.prototype.$gunroot = gun;
Vue.prototype.$user = gun.user();
Vue.prototype.$state = Gun.state;
Vue.prototype.$getState = Gun.state.is;
Vue.prototype.$soul = Gun.node.soul;
Vue.prototype.$node = Gun.node.ify;

export async function interlink({host, item}) {
  let hoster = gun.get(Gun.node.soul(host));
  let theitem = gun.get(Gun.node.soul(item));
  let itm = await hoster.get(item.type).set(theitem);
  let hstr = await theitem.get(host.type).set(hoster)
  return {hstr, itm}
}

export async function see(item, seen) {
  let key = Gun.node.soul(item);
  if (!seen[key]) {
    let it = gun.get(key);
    let its = await gun.user().get(path).get('seen').set(it)
    let pubit = await gun.get(path).get('seen').get(key).get(gun.user().is.pub).put('seen')
  } else {
    await gun.user().get(path).get('seen').get(key).put(null);
    gun.get(path).get('seen').get(key).get(gun.user().is.pub).put(null)
    delete seen[key];
  }
};

export async function addItem({item, type, author, host}) {
  item.type = type;
  item.createdAt = Gun.state();
  if (gun.user().is) {
    item.createdBy = gun.user().is.pub;
    if (author) {
      item = await gun.user().get(type).set(item)
    }
  }
  item = await gun.get(path).get(type).set(item)
  if (host) {
    item = await interlink({host, item})
  }
  return item
}

export async function updateItem(item, cb) {
  item.updatedAt = Gun.state();
  item.updatedBy = gun.user().is
    ? gun.user().is.pub
    : '';
  gun.get(Gun.node.soul(item)).put(item, cb)
}

export function getItem(soul, cb) {
  gun.get(soul).once(cb)
}

export function findUser(name, cb) {
  gun.get('~@' + name).once(cb)
}

export function countLinks(item, link, cb) {
  gun.get(Gun.node.soul(item)).get(link).map().once(cb)
}

export function getTypeItems(type, host, cb) {
  let g = host
    ? gun.get(Gun.node.soul(host))
    : gun.get(path);
  let query = g.get(type).map()
  query.on(cb)
  return query
}

export default gun
