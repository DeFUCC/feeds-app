

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

          <v-list-item >
            <v-list-item-icon>
              <v-icon>CC</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-text>
                <span class="overline">Powered by open source JS <br />
                  <a href="https://ru.vuejs.org" target="_blank" rel="nofollow noopener">Vue</a> UI +
                  <a href="https://gun.eco" target="_blank" rel="nofollow noopener">GUN</a> P2P Graph DB
                </span>
              </v-list-item-text>
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
