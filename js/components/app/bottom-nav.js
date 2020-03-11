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
    <v-bottom-navigation v-if="$root.loggedIn && $root.show.bottom && $root.tabs!=0" app="app">
      <v-btn :disabled="!$root.loggedIn"  @click="$root.edit=!$root.edit" link>
        <span :color="$root.edit?'orange':'#555'">
        РЕД
      </span>
          <v-icon :color="$root.edit?'orange':'#555'">mdi-pencil-outline</v-icon>
    </v-btn>
        <v-btn :disabled="!$root.loggedIn" :color="!$root.show.banned ? 'green':'red'" @click="$root.show.banned=!$root.show.banned" icon><span>БАН</span><v-icon>mdi-cancel</v-icon></v-btn>
    </v-bottom-navigation>
  </v-expand-transition>
  `,
  methods: {

  },
}
