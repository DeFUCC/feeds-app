const gun = new Gun([
  'http://localhost:4200/gun',
  'https://gun-vue.glitch.me/gun',
  'http://192.168.1.2:4200/gun'])

Gun.SEA.throw = true;

let path = 'feeds79'

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

export default gun
