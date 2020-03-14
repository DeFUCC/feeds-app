import gun from './gun-db.js'
import feed from './components/feed.js'
import appUi from './components/app/ui.js'
import {types} from './types.js'
import appInfo from './components/app/app-info.js'
import AsyncComputed from './assets/vue-async-computed.js'

Vue.use(AsyncComputed) //https://github.com/foxbenjaminfox/vue-async-computed

Vue.component('feed',feed)

const app = new Vue({
  el:'#app',
  vuetify: new Vuetify(),
  components:{
    appUi,
    appInfo
  },
  data:{
    title:'ЛЕНТЫ',
    peers:gun.back('opt.peers'),
    loggedIn:false,
    edit:false,
    auth:false,
    search:'',
    toLink:null,
    selected:null,
    isSelected:false,
    seen:{},
    creator:false,
    show:{
      banned:false,
      bottom:true,
      user:false,
      nav:false,
      seen:false,
    },
    sort:{
      byName:true,
    },
    types,
  },
  computed: {

  },
  created() {
    this.$user.recall({sessionStorage:true})

    gun.on('auth', (user) => {
      this.loggedIn=true;
      this.auth=false;
      this.$user.get('feeds').get('seen').map().on((item, key) => {
        this.$set(this.seen,key,item)
      })
    })
  },
  methods: {
    async toLinkTo(itemType,item) {
      let {toLink,interlink, $soul} = this;
      await interlink(toLink.type, $soul(toLink), itemType, item);
      this.toLink=null;
    },
    async interlink (hostType, hostSoul, itemType, itemSoul) {
      let hoster =  this.$gunroot.get(hostSoul);
      let theitem = this.$gunroot.get(itemSoul);
      let itm = await hoster.get(itemType).set(theitem);
      let hstr = await theitem.get(hostType).set(hoster)
      return {hstr,itm}
    },
    async see(item) {
      let {$user, $gunroot, $soul, $root} = this;
      if ($user.is) {
        let key = $soul(item)
        if (!$root.seen[key]) {
          let it = $gunroot.get(key);
          let its = await $user.get('feeds').get('seen').set(it)
        } else {
          await $user.get('feeds').get('seen').get(key).put(null)
        }
      }
    },
    log:console.log,
    select(item) {
      if(item==this.selected) {
        this.selected='';
      } else {
        this.selected='';
        this.selected=item;
      }
    }
  }
})
