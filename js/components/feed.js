import theCard from './card/the-card.js'
import addForm from './card/add-form.js'
import {cleanMap} from '../help.js'

export default {
  props: {
    type:String,
    loggedIn:false,
  },
  components:{
    theCard,
    addForm
  },
  data() {
    return{
      items:{},
      page:0,
      batch:20,
    }
  },
  created() {
    this.$gun.get(this.type).map().on((data,key) => {
      //  console.log(data, key)
        this.$set(this.items,key,data)
    })
  },
  template:`
  <v-container>

      <v-row >
        <v-col
          cols="12"
          v-for="(item,key) in filteredFeed"
          :key="item.updatedAt">
            <the-card
               :selected="$bus.selected==item"
               :item="item"
               :key="key" ></the-card>
        </v-col>
      </v-row>

      <add-form :base="true" :type="type"></add-form>

  </v-container>
  `,
  methods: {
    getOrder(item) {
      let num = - Math.round(this.$getState(item,'type')/1000 - 1500000000);
      return num
    },
    sortFunc(a,b) {
      let field = this.$bus.types[a.type].field;
      let aField = a[field].toLowerCase();
      let bField = b[field].toLowerCase();
      if ( aField > bField ) {
        return 1;
      }
      if (aField < bField) {
        return -1;
      }
      return 0;
    }
  },
  computed: {
    filteredFeed() {
      let feed = [];
      for (let key in this.items) {
        let item = this.items[key];

        if (item && (item.title || item.description)) {

            if ((this.$bus.show.banned && item.banned) ||(!this.$bus.show.banned && !item.banned) ) {
              feed.push(item)
            }
        }
      }
      return feed
    },
  },

}
