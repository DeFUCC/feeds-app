export default {

  data() {
    return {
      username:'',
      password:'',
      userObj:{},
      userExists:false,
    }
  },
  template: `
      <v-snackbar color="grey lighten-3" v-model="$bus.auth" multi-line flat vertical :timeout="0" top>

        <v-form model="validUser">

          <v-text-field v-model="username" label="Имя или никнейм"></v-text-field>

          <v-text-field v-model="password" type="password" label="Секретная фраза"></v-text-field>
          <v-row>
            <v-col cols="10">
              <v-btn v-if="!userExists" @click="signUp()">Представиться</v-btn>

              <v-btn v-if="userExists" @click="signIn()">Войти</v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn icon @click="$bus.auth=false"><v-icon>mdi-chevron-up</v-icon></v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-snackbar>
  `,
  watch: {
    username(name) {
      this.$gun.get("~@"+this.username).once((user) => {
        this.userExists=user
      })
    },
  },
  methods: {
    signIn() {
      this.$user.auth(this.username,this.password,this.loggedIn)
    },
    signUp() {
      this.$user.create(this.username,this.password,this.signedUp)
    },
    loggedIn(ack) {
      this.$bus.$emit('notify', 'Вы вошли в систему!')
      this.$user.get('profile').put({username:this.username})
    },
    signedUp(ack) {
      this.$bus.$emit('notify', 'Новый пользователь создан!')
    },
  }
}