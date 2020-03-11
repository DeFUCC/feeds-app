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
    <v-footer class="flex-nowrap" dark app fixed v-if="$root.selected">
        <v-btn icon small @click="findItem($root.selected)"><v-icon>mdi-magnify</v-icon></v-btn>
        <span>{{$root.selected.title || $root.selected.description}}</span><v-spacer></v-spacer>
        <v-btn @click="$bus.$emit('select')" icon small><v-icon>mdi-close</v-icon></v-btn>
    </v-footer>
  </v-expand-transition>
  `,
  methods: {
    findItem(item) {
      if(item.type=='words') {this.$root.tabs=1};
      if(item.type=='meanings') {this.$root.tabs=2};
      setTimeout(this.goTo, 500);
    },
    goTo() {
      this.$vuetify.goTo('#'+ this.$soul(this.$root.selected))
    },
  },
}
