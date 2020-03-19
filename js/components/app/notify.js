export default {
  props: [],
  data() {
    return{
      snackbar:false,
      message:'',
    }
  },
  mounted() {
    this.$root.$on('notify', (message) => {
      this.snackbar=true;
      this.message=message;
    })
  },
  template:`
    <v-snackbar multi-line color="info" v-model="snackbar" bottom multi-line>
      <span v-html="message"></span>
      <v-btn color="white" text="text" @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  `,
  methods: {

  },
  beforeDestroy() {
    this.$root.$off('notify')
  },
}
