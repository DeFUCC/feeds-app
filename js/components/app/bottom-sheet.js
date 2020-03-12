import itemCard from '../card/item-card.js'

export default {
  props: {
  },
  components:{
    itemCard
  },
  data() {
    return{
    }
  },
  template:`

    <v-bottom-sheet inset v-model="$root.selected" class="flex-nowrap" v-if="$root.selected">
      <v-sheet height="75vh" style="overflow:scroll">
        <item-card :more="true" :item="$root.selected" />

      </v-sheet>
    </v-bottom-sheet>

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
