import notify from './notify.js'
import userForm from './user-form.js'
import userDrawer from './user-drawer.js'
import appBar from './app-bar.js'
import footerInfo from './footer-info.js'
import bottomNav from './bottom-nav.js'
import appNav from './app-nav.js'
import bottomSheet from './bottom-sheet.js'

export default {
  components: {
    notify,
    userForm,
    userDrawer,
    appBar,
    footerInfo,
    bottomNav,
    appNav,
    bottomSheet,
  },
  data() {
    return {

    }
  },
  template: `
    <div>
      <notify />

      <user-form v-if="$root.auth && !$root.loggedIn" />

      <user-drawer v-if="$user && $root.loggedIn" />

      <app-nav />

      <app-bar />

      <footer-info />
      <bottom-sheet />

      <bottom-nav />
    </div>

  `,
}
