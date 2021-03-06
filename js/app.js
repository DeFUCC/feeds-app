import gun from './gun-db.js'
import {getItem} from './gun-db.js'
import router from './router.js'
import store from './store.js'
import feed from './components/feed.js'
import appUi from './components/app/ui.js'
import {types} from './schema/types.js'
import {i18n} from './i18n/all.js'

Vue.component('feed', feed) // recursively used component

const app = new Vue({
  el: '#app',
  i18n,
  router,
  vuetify: new Vuetify(),
  components: {
    appUi
  },
  data: {
    types
  },
  watch: {
    $route(to, from) {
      this.parseRoute(to)
    },
    '$store.selected' (item) {
      if (item) {
        this.$router.push({
          path: '',
          query: {
            item: this.$soul(item)
          }
        }).catch(err => {}) //throws an error, but it's ignored for now
      } else {
        this.$router.push({path: '', query: {}}).catch(err => {})
      }
    }
  },
  mounted() {
    this.$user.recall({
      sessionStorage: true
    }, this.logIn)
    gun.on('auth', this.logIn)
    this.parseRoute(this.$route)
  },
  methods: {
    logIn(user) {
      if (!user.err) {
        this.$store.loggedIn = true;
        this.$store.auth = false;
        this.$user.get('feeds').get('seen').map().on((item, key) => {
          this.$set(this.$store.seen, key, item)
        })
      } else {
        this.$root.$emit('notify', user.err)
      }
    },
    parseRoute(to) {
      if (to.query.item) {
        getItem(to.query.item, data => {
          if (data) {
            this.$store.selected = data
          }
        })
      } else {
        this.$store.selected = null
      }
    }
  }
})
