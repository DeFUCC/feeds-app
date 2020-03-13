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
      items:{},
      page:0,
      batch:20,
      add:false,
      page:{
        start:0,
        end:10,
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
      <v-col>
        <h3 class="title">{{getLinkDesc(type)}}</h3>
      </v-col>
      <v-col class="text-end">
        <span>
          {{page.end}} / {{page.total}}
        </span>
          <v-btn :class="{turn45:add}" @click="add=!add" icon><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
    </v-row>

      <v-row  style="max-height:65vh; overflow-y:scroll; ">
        <v-expand-transition>
          <v-col style="position:sticky" v-if="add">
              <add-form @added="add=false" :host="host" :type="type"></add-form>
          </v-col>
        </v-expand-transition>

          <v-col :style="{opacity:$root.toLink ? '0.5' : '1'}"
             class="py-1"
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
    }
  },
  computed: {
    typeField() {
      console.log(this.$root.types[this.type].fields.default.name)
      return this.$root.types[this.type].fields.default.name
    },
    filteredFeed() {
      let {items, page, sort, type, $root} = this
      let feed = {};
      let clean=0;
      let entries = Object.entries(items);
      page.total=entries.length;

      entries.sort(sort)

      for (let entry of entries) {
        let key = entry[0];
        let item = entry[1];

        if (!item) { continue }



        if(!(item.title || item.description)) {
          continue
        }

        if (($root.show.banned && !item.banned) ||(!$root.show.banned && item.banned)) {
          continue
        }

        if ($root.search && !(item.title.includes($root.search) || item.description.includes($root.search))) {
          continue
        }

        clean++;
        if (clean<this.page.start) {
          continue
        }

        if (Object.entries(feed).length>this.page.end) {
          this.more=true;
          break
        } else {
          this.more=false;
        }

        feed[key]=item
      }

      if (this.page.total && this.page.total<this.page.end) {
        this.page.end = this.page.total;
      }

      return feed
    },
  },

}
