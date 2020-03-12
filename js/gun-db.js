const gun = new Gun('https://gun-vue.glitch.me/gun', 'http://192.168.1.5:4200/gun')

Vue.prototype.$gun = gun.get('feeds79');
Vue.prototype.$gunroot= gun;
Vue.prototype.$user = gun.user();
Vue.prototype.$state = Gun.state;
Vue.prototype.$getState = Gun.state.is;
Vue.prototype.$soul = Gun.node.soul;
Vue.prototype.$node = Gun.node.ify;
Vue.prototype.$moment = moment;
moment.locale('ru')

export default gun
