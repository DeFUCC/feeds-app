import theCard from './card/the-card.js'
import addForm from './card/add-form.js'
import {cleanMap} from '../help.js'
import gun from '../gundb.js'

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
    gun.get(this.type).map().on((data,key) => {
      //  console.log(data, key)
        this.$set(this.items,key,data)
    })
  },
  template:`
  <v-container>
      <v-row >
        <v-col
          
          cols="12"
          v-for="(item,key) in items"
          :key="item">
            <the-card :id="$soul(item)"
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
        if(item && ( !item.banned || this.$bus.show.banned)) {
          if (this.type=='words') {
            if (item.letters.toLowerCase().includes(this.$bus.search)) {
              feed.push(item)
            }
          }
          if (this.type=='meanings') {
            if (item.text.toLowerCase().includes(this.$bus.search)) {
              feed.push(item)
            }
          }
        }
      }
      if (this.$bus.sort.byName && feed[0] && feed[0].type && this.$bus.types[feed[0].type]) {
        feed.sort(this.sortFunc);
      }
      return feed
    },
  },

}
