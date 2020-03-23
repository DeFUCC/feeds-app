import itemCard from "./card/item-card.js";
import addForm from "./card/add-form.js";
import intersect from '../assets/vue-intersect.js'


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
      page: {
        size:12,
        start: 0,
        end:24,
        shown: 0,
        total: 0,
      },
      more: false,
      loading:false,
    };
  },
  created() {

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

    let { $gunroot, $gun, $soul, host } = this;
    let gun;
    if (host) {
      gun = $gunroot.get($soul(host));
    } else {
      gun = $gun;
    }

    this.activeFeed = gun.get(this.type).map();

    this.activeFeed.on( (data, key) => {
        this.$set(this.items, key, data);
        this.$nextTick(this.updateFeed);
      });

//    this.sortAB = this.$root.types[this.type].sort == 'AB'
  },
  watch: {
    page: {
      deep:true,
      handler() {
        this.feedWorker.postMessage(this.feed);
      }
    },
    items() {
      this.loading=false
    },
    feed(feed) {
      this.feedWorker.postMessage(feed);
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
        show: this.$root.show,
        showSeen: this.showSeen,
        seen: this.$root.seen,
        search: this.search,
        rootSearch: this.$root.search,
        typeField: this.typeField,
        sortAB: this.sortAB,
        page:this.page,
      };
    }
  },
  mounted() {

  },
  methods: {
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
    onScroll(e) {
      console.log(e.target,e)
    },

  },

  template: `
  <v-container style="overscroll-behavior:none" :class="{'pa-0':!base, 'py-0':base}">
    <v-row>

      <v-col cols="6" class="flex-shrink-1">
        <h3 class="title">
          {{getLinkDesc(type)}}
        </h3>
      </v-col>

      <v-col cols="6" class="d-flex flex-grow-1 flex-nowrap text-end">

        <v-btn
          :color="sortAB ? 'black':'grey'" @click="sortAB=!sortAB"
          class="caption" icon>
          <span>AB</span>
        </v-btn>

        <v-btn v-if="$root.loggedIn"
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

      <v-row ref="frame" class="feed-scroller" style="max-height:90vh; overflow-y:scroll; scroll-snap-type: y mandatory; overscroll-y-behavior:none;">

        <v-expand-transition>
          <v-col class="py-0"
            style="position:sticky; min-width:100%; top:0; z-index:10"
            v-if="add"
            >
              <add-form @search="updateSearch"
                 @added="add=false;updateSearch('')"
                :host="host"
                :type="type">
              </add-form>

          </v-col>
        </v-expand-transition>

          <v-col v-if="$root.toLink"
            style="position:sticky; top:0; z-index:8"
            class="py-0"
            @click="$root.toLink=null"
            >
            <item-card
                  key="tolink"
                 :selected="true"
                 :item="$root.toLink"
                ></item-card>
          </v-col>



            <v-col

              class="py-2"
              cols="12"
              v-for="(item,key) in filteredItems"
              :key="item.createdAt+item.updatedAt"
              >
                <item-card
                  transition="slide-y-transition"
                   :closed="false"
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
    this.activeFeed.off()
    this.feedWorker.terminate();
  }
};
