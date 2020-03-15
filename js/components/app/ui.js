import notify from './notify.js'
import userForm from './user-form.js'
import userDrawer from './user-drawer.js'
import appBar from './app-bar.js'
import footerInfo from './footer-info.js'
import appNav from './app-nav.js'
import bottomSheet from './bottom-sheet.js'

export default {
  components: {
    notify,
    userForm,
    userDrawer,
    appBar,
    footerInfo,
    appNav,
    bottomSheet,
  },
  data() {
    return {

    }
  },
  template: `
    <div style="scroll-snap-align:start">
      <notify />

      <user-form v-if="$root.auth && !$root.loggedIn" />

      <user-drawer v-if="$user && $root.loggedIn" />

      <app-nav />

      <app-bar :types="$root.types"/>

      <footer-info />
      <bottom-sheet :item="$root.selected" v-if="$root.selected"/>

    </div>

  `,
}
