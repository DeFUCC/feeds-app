export default {

  data() {
    return {
    }
  },
  template: `
    <v-navigation-drawer style="z-index:100"
        v-model="$store.show.user"
        right app width="300px"
      >
      <v-list v-if="$store.loggedIn">
        <v-list-item>

          <v-list-item-avatar>
            <v-img src="https://frkt.ru/wp-content/uploads/2019/12/Project-wheel-copy-2-2x.png"></v-img>

          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{$user.is.alias}}

            </v-list-item-title>
          </v-list-item-content>
            <v-list-item-action>
                <v-btn icon  @click="$store.show.user=false">
                <v-icon>mdi-chevron-right</v-icon></v-btn>
             </v-list-item-action>
        </v-list-item>
        <v-list-item v-if="false">
          <v-list-item-icon>
            <v-icon>mdi-file</v-icon>
          </v-list-item-icon>
          <v-list-item-content >
            <v-list-item-title ><input type="file" accept="image/*"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list subheader
  three-line>


          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clipboard-account</v-icon>
            </v-list-item-icon>

          <v-list-item-content >
            <v-list-item-title >{{$t('pubKey')}}</v-list-item-title>
            <v-list-item-subtitle style="font-size:0.7em;">{{$user.is.pub}}</v-list-item-subtitle>
          </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>


          <v-list-item @click="$user.leave();checkLeave()" link>
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t('logout')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  `,
  watch: {
    username(name) {
      this.$gun.get("~@"+this.username).once((user) => {
        this.userExists=user
      })
    }
  },
  methods: {
    checkLeave() {
      setTimeout(() => {
        if(!this.$user._.sea) {
          this.$root.$emit('notify', 'Вы вышли!');
          this.$store.loggedIn=false;
          this.$root.auth=false;
        }
      },1000)
    },
  }
}
