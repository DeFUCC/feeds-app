import gun from './gundb.js'
import {cleanMap, stressedWord} from './help.js'

import feed from './components/feed.js'
import appInfo from './components/app-info.js'
import appUi from './components/app/ui.js'

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
  },
  created() {
    this.$user.recall({sessionStorage:true})

    gun.on('auth', (user) => {
      this.$bus.loggedIn=true;
      this.$bus.auth=false;
    })
  },
  methods: {

  },
  beforeDestroy() {

  }
})
