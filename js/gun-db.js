const gun = new Gun([
  'https://gun-feeds.glitch.me/gun'
  ])

Gun.SEA.throw = true;

let path = 'defucc'

Vue.prototype.$path = path
Vue.prototype.$gun = gun.get(path);
Vue.prototype.$gunroot= gun;
Vue.prototype.$user = gun.user();
Vue.prototype.$state = Gun.state;
Vue.prototype.$getState = Gun.state.is;
Vue.prototype.$soul = Gun.node.soul;
Vue.prototype.$node = Gun.node.ify;
Vue.prototype.$moment = moment;
moment.locale('ru')
Vue.prototype.$color = new ColorHash({
  saturation:[0.25, 0.35, 0.5],
  lightness: [0.65, 0.75, 0.85]
});

export const interlink = async (hostType, hostSoul, itemType, itemSoul) => {
  let hoster =  gun.get(hostSoul);
  let theitem = gun.get(itemSoul);
  let itm = await hoster.get(itemType).set(theitem);
  let hstr = await theitem.get(hostType).set(hoster)
  return {hstr,itm}
}

export default gun
