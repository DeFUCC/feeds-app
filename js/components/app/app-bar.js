import searchForm from './search-form.js'

export default {
  props: {
    types:Object,
  },
  components: {
    searchForm,
  },
  data() {
    return {
      search: false,
    }
  },
  computed: {
    is() {
      if(this.$user.is) {
        return this.$user.is
      }
      return {}
    },
  },
  template: `
  <v-app-bar :color="$store.loggedIn ? $color.hex('~'+is.pub) : 'grey lighten-1'" style="scroll-snap-align:start"  flat >
    <v-btn icon @click="$store.show.nav=true"><v-icon>mdi-menu</v-icon></v-btn>
    <v-toolbar-title>{{$t('title')}}</v-toolbar-title>

    <v-spacer ></v-spacer>
    <search-form v-if="search" @reset="search=false"></search-form>

    <v-item-group>
      <v-btn @click="search=true" icon v-if="!search"><v-icon right>mdi-magnify</v-icon></v-btn>

      <v-btn @click="$store.show.user=true" text v-if=" $store.loggedIn">{{is.alias}} <v-icon right>mdi-dots-vertical</v-icon></v-btn>

      <v-btn icon v-if="!$store.loggedIn" @click="$store.auth=true">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </v-item-group>
  </v-app-bar>
  `,
}
