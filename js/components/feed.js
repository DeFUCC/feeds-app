import itemCard from './card/item-card.js'
import addForm from './card/add-form.js'

export default {
  props: {
    type:String,
    host:Object,
    base:Boolean,
  },
  components:{
    itemCard,
    addForm
  },
  data() {
    return{
      selected:null,
      search:'',
      items:{},
      page:0,
      batch:20,
      add:false,
      page:{
        start:0,
        end:100,
        total:0,
      },
      more:false,
    }
  },
  mounted() {
    let {$gunroot, $gun, $soul, host} = this
    let gun
    if (host) {
      gun = $gunroot.get($soul(host))
    } else {
      gun = $gun
    }
    gun.get(this.type).map().on((data,key) => {
        this.$set(this.items,key,data)
    })
  },
  template:`
  <v-container :class="{'pa-0':!base, 'py-0':base}">
    <v-row>
      <v-col cols="6">
        <h3 class="title">{{getLinkDesc(type)}}</h3>

      </v-col>
      <v-col cols="6" class="text-end">
        <v-btn v-if="$root.loggedIn" :color="$root.show.seen ? 'black':'grey'" @click="$root.show.seen=!$root.show.seen" icon><v-icon v-if="$root.show.seen">mdi-eye</v-icon><v-icon v-if="!$root.show.seen">mdi-eye-off</v-icon></v-btn>
        <v-btn class="caption" icon><span>
          {{page.end}}/{{page.total}}
        </span></v-btn>

          <v-btn :class="{turn45:add}" @click="toggleAdd" icon><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
    </v-row>

      <v-row  style="max-height:80vh; overflow-y:scroll; ">
        <v-expand-transition>
          <v-col class="py-0" style="position:sticky; top:0; z-index:10" v-if="add">
              <add-form @search="updateSearch" @added="add=false" :host="host" :type="type"></add-form>
          </v-col>
        </v-expand-transition>

          <v-col
             class="py-2"
            cols="12"
            v-for="(item,key) in filteredFeed"
            :key="$state(item)">
            <v-expand-transition>
              <item-card
                 :selected="selected==item"
                 :item="item"
                 :key="key"></item-card>
            </v-expand-transition>
          </v-col>


        <v-col class="text-center">
          <v-btn v-if="more" x-large fab @click="page.end=page.end+10" icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
        </v-col>
      </v-row>


  </v-container>
  `,
  methods: {
    cleanMap(obj) {
        return Object.entries(obj).reduce((a,[k,v]) => (v === null ? a : {...a, [k]:v}), {})
    },
    toggleAdd() {
      if (this.add) {
        this.add=false;
        this.search='';
      } else {
        this.add=true;
      }
    },
    updateSearch(val) {
      this.search=val
    },
    getOrder(item) {
      let num = - Math.round(this.$getState(item,'type')/1000 - 1500000000);
      return num
    },
    getLinkDesc(link) {
      if(this.$root.types[link]) {
        return this.$root.types[link].title
      }
    },
    sort(a,b) {
      let aTitle = a[1][this.typeField].toLowerCase();
      let bTitle = b[1][this.typeField].toLowerCase();
      if ( aTitle > bTitle ) {
        return 1;
      }
      if (aTitle < bTitle) {
        return -1;
      }
      return 0;
    },
  },
  computed: {
    typeField() {
      return this.$root.types[this.type].fields.default.name
    },
  },
  asyncComputed: {
    async filteredFeed() {

      let {items, search, page, sort, type, $root, $soul} = this
      let feed = {};
      let clean=0;
      let entries = Object.entries(this.cleanMap(items));
      page.total=entries.length;

      entries.sort(sort)

      for (let entry of entries) {
        let key = entry[0];
        let item = entry[1];

        if (!item || item.VOID) { continue }

        if ($root.seen[key] && !$root.show.seen) {
          continue
        }

        if(!item[this.typeField]) {
          continue
        }

        if (($root.show.banned && !item.banned) ||(!$root.show.banned && item.banned)) {
          continue
        }

        if ($root.search && !item[this.typeField].toLowerCase().includes($root.search.toLowerCase())) {
          continue
        }

        if (search && !item[this.typeField].toLowerCase().includes(search.toLowerCase())) {
          continue
        }

        clean++;
        if (clean<this.page.start) {
          continue
        }

        if (Object.entries(feed).length>page.end) {
          this.more=true;
          break
        } else {
          this.more=false;
          page.end=page.total
        }

        feed[key]=item
      }

      return feed
    },
  }

}
