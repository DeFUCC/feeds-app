const gun = new Gun('https://gun-vue.glitch.me/gun', 'http://192.168.1.5:4200/gun')
import {types} from './types.js'
//

Vue.prototype.$bus = new Vue({
  data:{
    loggedIn:false,
    edit:false,
    auth:false,
    search:'',
    selected:null,
    isSelected:false,
    tabs:1,
    show:{
      banned:false,
      bottom:true,
      user:false,
      nav:false,
    },
    sort:{
      byName:true,
    },
    types,
  },
  watch: {
    isSelected(val) {
      if (!val && this.selected) {
        this.selected=''
      }
    }
  },
});

const bus = Vue.prototype.$bus

bus.$on('select', (item) => {
  if(bus.selected==item) {
    bus.selected=''
    bus.isSelected=false
  } else {
    bus.selected=item;
    bus.isSelected=true
  }
})

Vue.prototype.$gun = gun.get('feeds783');
Vue.prototype.$gunroot= gun;
Vue.prototype.$user = gun.user();
Vue.prototype.$state = Gun.state;
Vue.prototype.$getState = Gun.state.is;
Vue.prototype.$soul = Gun.node.soul;
Vue.prototype.$node = Gun.node.ify;
Vue.prototype.$moment = moment;
moment.locale('ru')

// const app = gun.get('etovoteto')
export default gun
