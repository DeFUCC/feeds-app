import notify from './notify.js'
import userForm from './user-form.js'
import userDrawer from './user-drawer.js'
import appBar from './app-bar.js'
import footerInfo from './footer-info.js'
import bottomNav from './bottom-nav.js'

export default {
  components: {
    notify,
    userForm,
    userDrawer,
    appBar,
    footerInfo,
    bottomNav,
  },
  data() {
    return {

    }
  },
  template: `
    <div>
      <notify></notify>

      <user-form v-if="$bus.auth && !$bus.loggedIn" ></user-form>

      <user-drawer v-if="$user && $bus.loggedIn"></user-drawer>

      <app-bar></app-bar>

      <footer-info></footer-info>

      <bottom-nav></bottom-nav>
    </div>

  `,
}
