import gun from './gun-db.js'
import {cleanMap, stressedWord} from './help.js'
import feed from './components/feed.js'
import appUi from './components/app/ui.js'
import {types} from './types.js'
import appInfo from './components/app/app-info.js'

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
  created() {
    this.$user.recall({sessionStorage:true})

  /*  window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = '';
    });
*/
    gun.on('auth', (user) => {
      this.loggedIn=true;
      this.auth=false;
    })
  },
  methods: {
    log:console.log,
    select(item) {
      if(item==this.selected) {
        this.selected='';
      } else {
        this.selected=item;
      }
    }
  }
})
