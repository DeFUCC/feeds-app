import itemCard from '../card/item-card.js'
import editable from '../editable.js'

export default {
  props: {
    item:Object,
  },
  components:{
    itemCard,
    editable,
  },
  data() {
    return{
      open:{},
      links:{},
      creator:'',
      selected:{},
    }
  },
  template:`

    <v-bottom-sheet inset v-model="open" class="flex-nowrap" v-if="item" >
      <v-card height="75vh"
        :style="{border: '2px solid ' + $color.hex($soul(item))}"
        style="overflow:scroll"
        >

        <v-card-title style="position:sticky; top:0;background-color:#eee" class="py-4 px-4 pointer"
          >
              <editable
                v-if="item.title"
                :item="item"
                property="title"
              />
              <editable
                v-if="item.description"
                :item="item"
                property="description"
                ></editable>
              <v-spacer/>

              <v-btn icon :disabled="!$root.loggedIn"  @click="$root.edit=!$root.edit">
                  <v-icon :color="$root.edit?'orange':'#555'">mdi-pencil-outline</v-icon>
              </v-btn>
        </v-card-title>
        <v-card-actions class="overline" >
          <v-btn v-if="item.createdBy && ((item.createdBy && !$user.is) || ($user.is && item.createdBy != $user.is.pub))" icon><v-icon>mdi-lock-outline</v-icon></v-btn>
          <v-btn v-else icon><v-icon>mdi-lock-open-variant-outline</v-icon></v-btn>
          <span>
            Автор: {{creator || 'Аноним'}}<br/>
            Создано {{$moment(item.createdAt).fromNow()}}
            <br/>
            <span v-if="item.updatedAt">
              Отредактировано  {{$moment(item.updatedAt).fromNow()}}
            </span>
          </span>

      </v-card-actions>
        <v-expand-transition>

          <v-container v-if="links">
            <v-row class="ma-0 pa-0"
               v-for="(linked,linksKey) in links" :key="$soul(item)+linksKey">

                  <feed :host="item" :type="linksKey" />
            </v-row>
          </v-container>

        </v-expand-transition>
      </v-card>
    </v-bottom-sheet>

  `,
  watch: {
    item() {
      this.getCreator();
      this.getLinks();
    },
    open(val) {
      if (!val) {
        this.$root.select(this.item)
      }
    }
  },
  computed: {
    linkTypes() {
      let links=[];
      let {item,$root} = this;
      let type = item.type;
      if ($root.types[type]) {
        links = $root.types[type].links
      }
      return links
    }
  },
  created() {
    this.getCreator();
    this.getLinks();
  },
  methods: {
    async getCreator() {
      if (this.item.createdBy) {
        let user = await this.$gun.user(this.item.createdBy)

        if (user && user.alias) {
          this.creator = user.alias
        }

      }
    },
    getLinks() {
      let { links, item, $soul, $gun, $set } = this;
      for (let link of this.linkTypes) {
        $set(links,link,{})
        $gun.get($soul(item)).get(link).map().on((lnk,key) => {
          $set(links[link],key,lnk)
        })
      }
    },
  },
}
