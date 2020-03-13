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
    <v-footer class="flex-nowrap" dark app fixed v-if="$root.toLink">
        <v-btn icon small @click="findItem($root.toLink)"><v-icon>mdi-magnify</v-icon></v-btn>
        <span>{{$root.toLink.title || $root.toLink.description}}</span><v-spacer></v-spacer>
        <v-btn @click="$root.toLink=null" icon small><v-icon>mdi-close</v-icon></v-btn>
    </v-footer>
  </v-expand-transition>
  `,
  methods: {
    findItem(item) {
      setTimeout(this.goTo, 300);
    },
    goTo() {
      this.$vuetify.goTo('#'+ this.$soul(this.$root.selected))
    },
  },
}
