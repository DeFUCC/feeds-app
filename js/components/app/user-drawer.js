export default {

  data() {
    return {
    }
  },
  template: `
    <v-navigation-drawer
        v-model="$root.show.user"
        right app width="300px"
      >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://frkt.ru/wp-content/uploads/2019/12/Project-wheel-copy-2-2x.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{$user.is.alias}}

            </v-list-item-title>
          </v-list-item-content>
            <v-list-item-action>
                <v-btn icon  @click="$root.show.user=false">
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
            <v-list-item-title >Ваш публичный ключ</v-list-item-title>
            <v-list-item-subtitle style="font-size:0.7em;">{{$user.is.pub}}</v-list-item-subtitle>
          </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>

          <v-list-item @click="$root.show.bottom=!$root.show.bottom">
            <v-list-item-icon >
              <v-icon :style="{color:$root.show.bottom ? 'orange' : 'grey'}">mdi-dock-bottom</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title :style="{color:$root.show.bottom ? 'orange' : ''}">Меню управления</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="$user.leave();checkLeave()" link>
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Выйти</v-list-item-title>
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
          this.$bus.$emit('notify', 'Вы вышли!');
          this.$root.loggedIn=false;
          this.$root.auth=false;
        }
      },1000)
    },
  }
}
