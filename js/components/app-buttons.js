export default {

  data() {
    return {

    }
  },
  template: `
  <v-item-group>

    <v-btn @click="$bus.userProfile=true" text v-if="$bus.loggedIn">{{$user.is.alias}} <v-icon right>mdi-dots-vertical</v-icon></v-btn>

    <v-btn icon v-if="!$bus.loggedIn" @click="$bus.auth=true">
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
  </v-item-group>
  `,

}
