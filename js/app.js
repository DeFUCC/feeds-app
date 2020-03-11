import gun from './gun-bus.js'
import {cleanMap, stressedWord} from './help.js'

import feed from './components/feed.js'
import appInfo from './components/app-info.js'
import appUi from './components/app/ui.js'
import {types} from './types.js'

Vue.component('feed',feed)

const app = new Vue({
  el:'#app',
  vuetify: new Vuetify(),
  components:{
    appUi,
    feed,
    appInfo,
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

    gun.on('auth', (user) => {
      this.loggedIn=true;
      this.auth=false;
    })
  },
})
