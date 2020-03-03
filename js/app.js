import gun from './gundb.js'
import {cleanMap, stressedWord} from './help.js'

import systemBar from './components/system-bar.js'
import notify from './components/notify.js'
import searchForm from './components/search-form.js'
import feed from './components/feed.js'
import theCard from './components/the-card.js'
import userForm from './components/user-form.js'
import userDrawer from './components/user-drawer.js'
import appButtons from './components/app-buttons.js'
import footerInfo from './components/footer-info.js'
import bottomNav from './components/bottom-nav.js'
import gameInfo from './components/game-info.js'

const app = new Vue({
  el:'#app',
  vuetify: new Vuetify(),
  components:{
    systemBar,
    notify,
    searchForm,
    feed,
    theCard,
    userForm,
    userDrawer,
    appButtons,
    footerInfo,
    bottomNav,
    gameInfo,
  },
  data:{
    title:'ЛЕНТЫ',
    peers:gun.back('opt.peers'),
    types:['words','meanings']
  },
  mounted() {
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
