

export default {
  components:{
  },
  data() {
    return {
    }
  },
  template: `
    <v-navigation-drawer
        v-model="$root.show.nav"
        left app width="300px"
      >
      <v-list>
        <v-list-item>


          <v-list-item-content>
            <v-list-item-title>
              ЛЕНТЫ
            </v-list-item-title>
          </v-list-item-content>
            <v-list-item-action>
                <v-btn icon  @click="$root.show.nav=false">
                <v-icon>mdi-chevron-left</v-icon></v-btn>
             </v-list-item-action>
        </v-list-item>

      </v-list>

        <v-divider></v-divider>

        <v-list>
          <router-link to="/" style="text-decoration:none">
            <v-list-item>
              <v-list-item-content>

                  <v-list-item-title class="title">
                    Словарь
                  </v-list-item-title>

              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/game" style="text-decoration:none">
            <v-list-item>
              <v-list-item-content>

                  <v-list-item-title class="title">
                    Игры
                  </v-list-item-title>

              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-list-item >
            <v-list-item-content>
              <v-list-item-subtitle>
                <span class="overline">Powered by open source JS <br />
                  <a href="https://ru.vuejs.org" target="_blank" rel="nofollow noopener">Vue</a> UI +
                  <a href="https://gun.eco" target="_blank" rel="nofollow noopener">GUN</a> P2P Graph DB
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>


        </v-list>

      </v-navigation-drawer>

  `,
  watch: {

  },
  methods: {

  }
}
