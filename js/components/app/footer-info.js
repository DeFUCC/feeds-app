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
    <v-footer class="flex-nowrap" dark app fixed v-if="$bus.selected">
        <v-btn icon small @click="findItem($bus.selected)"><v-icon>mdi-magnify</v-icon></v-btn>
        <span>{{$bus.selected.title || $bus.selected.description}}</span><v-spacer></v-spacer>
        <v-btn @click="$bus.$emit('select')" icon small><v-icon>mdi-close</v-icon></v-btn>
    </v-footer>
  </v-expand-transition>
  `,
  methods: {
    findItem(item) {
      if(item.type=='words') {this.$bus.tabs=1};
      if(item.type=='meanings') {this.$bus.tabs=2};
      setTimeout(this.goTo, 500);
    },
    goTo() {
      this.$vuetify.goTo('#'+ this.$soul(this.$bus.selected))
    },
  },
}
