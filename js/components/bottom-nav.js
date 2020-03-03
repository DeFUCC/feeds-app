export default {
  name:'bottom-nav',
  props: {
  },
  components:{
  },
  data() {
    return{
    }
  },
  template:`
  <v-expand-transition>
    <v-bottom-navigation v-if="$bus.loggedIn && $bus.show.bottom && $bus.tabs!=0" app="app">
      <v-btn :disabled="!$bus.loggedIn"  @click="$bus.edit=!$bus.edit" link>
        <span :color="$bus.edit?'orange':'#555'">
        РЕД
      </span>
          <v-icon :color="$bus.edit?'orange':'#555'">mdi-pencil-outline</v-icon>
    </v-btn>
        <v-btn :disabled="!$bus.loggedIn" :color="!$bus.show.banned ? 'green':'red'" @click="$bus.show.banned=!$bus.show.banned" icon><span>БАН</span><v-icon>mdi-cancel</v-icon></v-btn>
    </v-bottom-navigation>
  </v-expand-transition>
  `,
  methods: {

  },
}
