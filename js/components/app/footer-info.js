export default {
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
    <v-footer class="flex-nowrap" dark app fixed v-if="$store.toLink">
        <v-btn icon small @click="findItem($store.toLink)"><v-icon>mdi-magnify</v-icon></v-btn>
        <span>{{$store.toLink.title || $store.toLink.description}}</span><v-spacer></v-spacer>
        <v-btn @click="$store.toLink=null" icon small><v-icon>mdi-close</v-icon></v-btn>
    </v-footer>
  </v-expand-transition>
  `,
  methods: {
    findItem(item) {
      setTimeout(this.goTo, 300);
    },
    goTo() {
      this.$vuetify.goTo('#'+ this.$soul(this.$store.selected))
    },
  },
}
