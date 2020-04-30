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
      <v-snackbar color="grey lighten-3" v-model="$root.auth" multi-line flat vertical :timeout="0" top>

        <v-form model="validUser">

          <v-text-field v-model="username" label="Имя или никнейм"></v-text-field>

          <v-text-field v-model="password" type="password" @keydown.enter="userExists ? signIn() : signUp()" label="Секретная фраза"></v-text-field>
          <v-row>
            <v-col cols="10">
              <v-btn v-if="!userExists" @click="signUp()">{{$t('signUp')}}</v-btn>

              <v-btn v-if="userExists" @click="signIn()">{{$t('signIn')}}</v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn icon @click="$root.auth=false"><v-icon>mdi-close</v-icon></v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-snackbar>
  `,
  watch: {
    username(name) {
      this.$gun.back().get("~@"+this.username).once((user) => {
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
      this.$root.loggedIn=true;
      this.$root.$emit('notify', 'Вы вошли в систему!')
      this.$user.get('title').put(this.username)
      this.$user.get('type').put('player')
    },
    signedUp(ack) {
      if(ack.err) {
        this.$root.$emit('notify', ack.err)
        return
      }
      this.$root.$emit('notify', 'Новый пользователь создан!')
      console.log(ack)
      this.$gun.get('player').set(this.$gunroot.user(ack.pub))
      this.loggedIn()
    },
  }
}
