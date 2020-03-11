const gun = new Gun('https://gun-vue.glitch.me/gun', 'http://192.168.1.5:4200/gun')
import {types} from './types.js'
//

Vue.prototype.$bus = new Vue({
  data:{
    isSelected:false,
  },
  watch: {
    isSelected(val) {
      if (!val && this.selected) {
        this.selected=''
      }
    }
  },
  created() {
    this.$on('select', (item) => {
      if(this.selected==item) {
        this.selected=''
        this.isSelected=false
      } else {
        this.selected=item;
        this.isSelected=true
      }
    })
  }
});

Vue.prototype.$gun = gun.get('feeds79');
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
