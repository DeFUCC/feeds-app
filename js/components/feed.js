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
      filteredItems:[],
      batch:20,
      add:false,
      showSeen:false,
      page:{
        start:0,
        end:100,
        total:0,
      },
      more:false,
    }
  },
  created() {
    if (window.Worker) {
      this.feedWorker = new Worker('./js/worker.js')
      this.feedWorker.onmessage = (e) => {
        this.filteredItems=e.data.feed;
        this.page.total = e.data.total;
        this.more = e.data.more;
      }
    } else {
      console.log('no worker support')
    }

    let {$gunroot, $gun, $soul, host} = this
    let gun
    if (host) {
      gun = $gunroot.get($soul(host))
    } else {
      gun = $gun
    }
    gun.get(this.type).map().on((data,key) => {
        this.$set(this.items,key,data)
        this.$nextTick(this.updateFeed)
    })

  },
  watch: {
    feed (feed) {
      this.feedWorker.postMessage(feed)
    }
  },
  computed: {
    typeField() {
      return this.$root.types[this.type].fields.default.name
    },
    feed() {
      return {
        items:this.items,
        show:this.$root.show,
        showSeen:this.showSeen,
        seen:this.$root.seen,
        search:this.search,
        rootSearch:this.$root.search,
        typeField:this.typeField,
      }
    }
  },
  methods: {
    updateFeed() {
      this.feedWorker.postMessage(this.feed)
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
    getLinkDesc(link) {
      if(this.$root.types[link]) {
        return this.$root.types[link].title
      }
    },
  },

  template:`
  <v-container style="height:100vh" :class="{'pa-0':!base, 'py-0':base}">
    <v-row>
      <v-col cols="6">
        <h3 class="title">{{getLinkDesc(type)}}</h3>

      </v-col>
      <v-col cols="6" class="text-end">
        <v-btn v-if="$root.loggedIn" :color="showSeen ? 'black':'grey'" @click="showSeen=!showSeen" icon><v-icon v-if="showSeen">mdi-eye</v-icon><v-icon v-if="!showSeen">mdi-eye-off</v-icon></v-btn>
        <v-btn class="caption" icon><span>
          {{page.end}}/{{page.total}}
        </span></v-btn>

          <v-btn :class="{turn45:add}" @click="toggleAdd" icon><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
    </v-row>

      <v-row  style="max-height:90%; overflow-y:scroll; scroll-snap-type: y mandatory;">
        <v-expand-transition>
          <v-col class="py-0" style="position:sticky; top:0; z-index:10" v-if="add">
              <add-form @search="updateSearch" @added="add=false" :host="host" :type="type"></add-form>
          </v-col>
        </v-expand-transition>

          <v-col style="scroll-snap-align: start;"
            class="py-2"
            cols="12"
            v-for="(item,key) in filteredItems"
            :key="item.createdAt+item.updatedAt"
            >

            <v-expand-transition>
              <item-card
                 :selected="selected==item"
                 :item="item"
                 :key="item.createdAt+item.updatedAt"></item-card>
            </v-expand-transition>
          </v-col>


        <v-col class="text-center">
          <v-btn v-if="more" x-large fab @click="page.end=page.end+10" icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
        </v-col>
      </v-row>


  </v-container>
  `,
  beforeDestroy() {
    this.feedWorker.terminate();
  }
}
