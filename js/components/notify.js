export default {
  props: [],
  data() {
    return{
      snackbar:false,
      message:'',
    }
  },
  mounted() {
    this.$bus.$on('notify', (message) => {
      this.snackbar=true;
      this.message=message;
    })
  },
  template:`
    <v-snackbar multi-line color="info" v-model="snackbar" bottom multi-line>
      {{ message }}
      <v-btn color="white" text="text" @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  `,
  methods: {

  },
  beforeDestroy() {
    this.$bus.$off('notify')
  },
}
