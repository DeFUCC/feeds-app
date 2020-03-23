import gun from './gun-db.js'
import router from './router.js'
import feed from './components/feed.js'
import appUi from './components/app/ui.js'
import {types} from './types.js'
import appInfo from './components/app/app-info.js'


Vue.component('feed',feed)

const app = new Vue({
  el:'#app',
  router,
  vuetify: new Vuetify(),
  components:{
    appUi,
    appInfo,
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
    feedNum:5,
    types,
  },
  computed: {
    activeTypes() {
      let active={};
      for (let type in this.types) {
        if (this.types[type].active) {
          active[type]=this.types[type]
        }
      }
      return active
    }
  },
  created() {


    for (let type in this.types) {
      this.$set(this.types[type],'active',true)
    }

    gun.on('auth', this.logIn)
  },
  watch: {
    $route(to,from) {
      this.parseRoute(to)
    }
  },
  mounted() {
    this.parseRoute(this.$route)
    this.$user.recall({sessionStorage:true},this.logIn)
  },
  methods: {
    logIn(user) {
        this.loggedIn=true;
        this.auth=false;
        this.$user.get('feeds').get('seen').map().on((item, key) => {
          this.$set(this.seen,key,item)
        })
    },
    parseRoute(to) {
      if(to.query.item) {
        this.$gunroot.get(to.query.item).once(data => {
          if (data) {
            this.selected = data
          }
        })
      }
    },
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
    stressedWord(word='', stress=0)   {
            stress = Number(stress);
            let arr = word.split('');
            let parts = [];
            if (arr.length > 0) {
              arr[0] = arr[0].toUpperCase();
              parts[0] = arr.slice(0, stress+1).join('');
              parts[1] = '\u0301';
              parts[2] = arr.slice(stress+1).join('');
            }
            return parts.join('')
    },
    log:console.log,
    select(item) {
      if (item == this.selected || !item) {
        this.selected=null;
        this.$router.push({
          path:'',
          query: {},
        })
      } else {
        this.selected = item;
        this.$router.push({
          path:'',
          query: {
            item: this.$soul(item)
          },
        })
        console.log(this.$route.query)
      }
    }
  }
})
