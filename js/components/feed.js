import itemCard from './card/item-card.js'
import addForm from './card/add-form.js'

export default {
  props: {
    type:String,
    host:Object,
  },
  components:{
    itemCard,
    addForm
  },
  data() {
    return{
      selected:null,
      items:{},
      page:0,
      batch:20,
      add:false,
    }
  },
  async created() {
    let {$gunroot, $gun, $soul} = this
    let gun
    if (this.host) {
      gun = $gunroot.get($soul(this.host))
    } else {
      gun = $gun
    }
    gun.get(this.type).map().on((data,key) => {
        this.$set(this.items,key,data)
    })
  },
  template:`
  <v-container>
    <v-row>
      <v-col cols="10">
        <h3>{{getLinkDesc(type)}}</h3>
      </v-col>
      <v-col class="text-center" cols="2">
          <v-btn :class="{turn45:add}" @click="add=!add" icon><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-expand-transition>
    <v-row v-if="add">
      <v-col >

          <add-form @added="add=false" :host="host" :type="type"></add-form>

      </v-col>
    </v-row>
    </v-expand-transition>
      <v-row >
        <v-col
          cols="12"
          v-for="(item,key) in filteredFeed"
          :key="item.updatedAt">
            <item-card
               :selected="selected==item"
               :item="item"
               :key="key"></item-card>
        </v-col>
      </v-row>


  </v-container>
  `,
  methods: {
    getOrder(item) {
      let num = - Math.round(this.$getState(item,'type')/1000 - 1500000000);
      return num
    },
    getLinkDesc(link) {
      if(this.$root.types[link]) {
        return this.$root.types[link].title
      }
    },
    cleanMap(obj) {
        return Object.entries(obj).reduce((a,[k,v]) => (v === null ? a : {...a, [k]:v}), {})
    },
    sortFunc(a,b) {
      let field = this.$root.types[a.type].field;
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
      let feed = {};
      for (let key in this.items) {
        let item = this.items[key];

        if (!item) { continue }

        if(!(item.title || item.description)) {
          continue
        }

        if ((this.$root.show.banned && !item.banned) ||(!this.$root.show.banned && item.banned)) {
          continue
        }

        if (this.$root.search && !(item.title.includes(this.$root.search) || item.description.includes(this.$root.search))) {
          continue
        }

        feed[key]=item
      }


      return feed
    },
  },

}
