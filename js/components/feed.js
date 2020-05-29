import itemCard from "./card/item-card.js";
import addForm from "./card/add-form.js";
import intersect from '../assets/vue-intersect.js'
import {getTypeItems} from '../gun-db.js'

export default {
  props: {
    type: String,
    host: Object,
    base: Boolean,
  },
  components: {
    itemCard,
    addForm,
    intersect,
  },
  data() {
    return {
      selected: null,
      search: '',
      items: {},
      filteredItems: [],
      activeFeed:'',
      batch: 20,
      add: false,
      showSeen: false,
      sortAB: false,
      currentLetter: "",
      itemQuery:'',
      page: {
        size:12,
        start: 0,
        end:12,
        shown: 0,
        total: 0,
      },
      more: false,
      loading:true,
    };
  },
  created() {
    this.createWorker();
    this.itemQuery = getTypeItems(this.type, this.host, (data, key) => {
      this.$set(this.items, key, data);
    //  this.$nextTick(this.updateFeed);
    })
  },
  watch: {
    page: {
      deep:true,
      handler() {
        this.updateFeed();
      }
    },
    items() {
      this.loading=false
    },
    feed() {
      this.updateFeed()
    }
  },
  computed: {
    typeField() {
      return this.$root.types[this.type].fields.default.name;
    },
    feed() {
      return {
        items: this.items,
        host: this.host,
        type: this.type,
        show: this.$store.show,
        showSeen: this.showSeen,
        seen: this.$store.seen,
        search: this.search,
        rootSearch: this.$store.search,
        typeField: this.typeField,
        sortAB: this.sortAB,
        page:this.page,
      };
    }
  },
  methods: {
    createWorker() {
      if (window.Worker) {
        this.feedWorker = new Worker("./js/worker.js");
        this.feedWorker.onmessage = e => {
          this.filteredItems = e.data.feed;
          this.page.total = e.data.total;
          this.page.shown = e.data.shown;
          this.more = e.data.more;
        };
      } else {
        console.log("no worker support");
      }
    },
    updateFeed() {
      this.feedWorker.postMessage(this.feed);
    },
    toggleAdd() {
      if (this.add) {
        this.add = false;
        this.search = "";
      } else {
        this.add = true;
      }
    },
    updateSearch(val) {
      this.search = val;
    },
    getLinkDesc(link) {
      if (this.$root.types[link]) {
        return this.$root.types[link].title;
      }
    },
    loadMore(){
      this.loading=true
      this.page.end = this.page.end + this.page.size
    },
  },

  template: `
  <v-container ref="feeder" style="overscroll-behavior:none; background-color:#eee" :class="{'pa-0':!base, 'py-0':base}" >
    <v-row class="d-flex">

      <v-col class="ma-1 pl-2 pt-1 flex-shrink-1">
        <h3 @click="$refs.feeder.scrollIntoView({inline: 'start', behavior: 'smooth'})" class="subtitle-1 pointer">
          {{getLinkDesc(type)}}
        </h3>
      </v-col>
      <v-spacer></v-spacer>
      <v-col  class="pa-0 mr-2 d-flex flex-grow-1 flex-nowrap text-end">

        <v-btn
          :color="sortAB ? 'black':'grey'" @click="sortAB=!sortAB"
          class="caption" icon>
          <span>AB</span>
        </v-btn>

        <v-btn v-if="$store.loggedIn"
          :color="showSeen ? 'black':'grey'" @click="showSeen=!showSeen" icon>
          <v-icon v-if="showSeen">
            mdi-eye
          </v-icon>
          <v-icon v-if="!showSeen">
            mdi-eye-off
          </v-icon>
        </v-btn>

        <v-btn class="caption" icon>
          <span>{{page.shown}}/{{page.total}}</span>
        </v-btn>

          <v-btn :class="{turn45:add}" @click="toggleAdd" icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>

      </v-col>
    </v-row>

      <v-row ref="frame" class="feed-scroller" :style="{overflowY: host ? 'visible' : 'scroll'}" style="max-height:90vh; scroll-snap-type: y mandatory; overscroll-y-behavior:none;">

        <v-expand-transition>
          <v-col class="py-0"
            style="position:sticky; min-width:100%; top:0; z-index:50"
            v-if="add"
            >
              <add-form @search="updateSearch"
                 @added="add=false;updateSearch('')"
                :host="host"
                :type="type">
              </add-form>

          </v-col>
        </v-expand-transition>

          <v-col v-if="$store.toLink"
            style="position:sticky; top:0; z-index:8"
            class="py-0"
            @click="$store.toLink=null"
            >
            <item-card
                  key="tolink"
                 :selected="true"
                 :item="$store.toLink"
                ></item-card>
          </v-col>


            <v-col
              style="scroll-snap-align:start end"
              class="py-2"
              cols="12"
              v-for="(item,key) in filteredItems"
              :key="item.createdAt"
              >
                <item-card
                    :host="host"
                    transition="slide-y-transition"
                    @open="item.open=true"
                    @unclose="$set(item,'unclosed', true)"
                    @close="$set(item,'unclosed', false)"
                    :selected="selected==item"
                    :item="item"
                    :key="item.createdAt+item.updatedAt"
                   >
                 </item-card>

            </v-col>

        <intersect v-if="more"  @enter="loadMore()">
          <v-col  class="feed-loader text-center">
            <v-btn :disabled="loading"  x-large fab @click="loadMore()" icon>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </v-col>
        </intersect>

      </v-row>
  </v-container>
  `,
  beforeDestroy() {
    this.itemQuery.off()
    this.feedWorker.terminate();
  }
};
