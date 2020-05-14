import {interlink,see} from './gun-db.js'

const store = new Vue({
  data: {
    loggedIn:false,
    auth:false,
    search:'',
    toLink:null,
    selected:null,
    seen:{},
    show:{
      banned:false,
      bottom:true,
      user:false,
      nav:false,
      seen:false,
    },
  },
  methods: {
    select(item) {
      if (item == this.selected || !item) {
        this.selected=null;
      } else {
        this.selected = item;
      }
    },
    interlink,
    async linkTo(item) {
      await interlink({
        host:this.toLink,
        item,
      });
      this.toLink=null;
    },
    async see(item) {
      await see(item,this.seen)
    },
  }
})

Vue.prototype.$store = store;
Vue.prototype.$moment = moment;
moment.locale('ru')
Vue.prototype.$color = new ColorHash({
  saturation:[0.25, 0.35, 0.5],
  lightness: [0.65, 0.75, 0.85]
});

export default store
