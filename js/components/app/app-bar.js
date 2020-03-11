import searchForm from './search-form.js'

export default {
  components: {
    searchForm,
  },
  data() {
    return {
      title:'ЛЕНТЫ',
      search: false,
    }
  },
  template: `
  <v-app-bar color="grey lighten-1" flat hide-on-scroll app>
    <v-btn icon @click="$root.show.nav=true"><v-icon>mdi-menu</v-icon></v-btn>
    <v-toolbar-title>{{title}}</v-toolbar-title>

    <v-spacer ></v-spacer>
    <search-form v-if="search" @reset="search=false"></search-form>

    <v-item-group>
      <v-btn @click="search=true" icon v-if="!search"><v-icon right>mdi-magnify</v-icon></v-btn>
      <v-btn @click="$root.show.user=true" text v-if="$root.loggedIn">{{$user.is.alias}} <v-icon right>mdi-dots-vertical</v-icon></v-btn>

      <v-btn icon v-if="!$root.loggedIn" @click="$root.auth=true">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </v-item-group>

    <template v-slot:extension>
      <v-tabs center-active show-arrows v-model="$root.tabs">
        <v-tab>ФРУКТ</v-tab>
        <v-tab v-for="type in $root.types">{{type.title}}</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
  `,
}
