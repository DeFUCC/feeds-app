import cardActions from './card-actions.js'
import addForm from './add-form.js'
import editable from './editable.js'

export default {
  name:'item-card',
  props: {
    item:Object,
    selected:Boolean,
    more:Boolean,
  },
  components:{
    cardActions,
    addForm,
    editable,
  },
  data() {
    return {
      selected:{},
      links:{},
      open: {
        add:false,
        more:false,
      },
      edit: {
        title:false,
        description:false,
      },
      creator:null,
    }
  },
  mounted() {
    if(this.more) {
      this.open.more=true;
    }
  },
  template:`
        <v-card
          :id="$soul(item)"
          :raised="selected"
          :outlined="!selected"
          :style="{borderLeft: '4px solid ' + $color.hex($soul(item))}">
            <v-card-title class="py-1 px-2 pointer"
              >
                  <editable
                    v-if="item.title || $root.edit"
                    :item="item"
                    property="title"
                    :selected="selected"
                  />
                  <editable
                    v-if="item.description || $root.edit"
                    :item="item"
                    property="description"
                    :selected="selected"
                    ></editable>
                    <v-spacer/>
                    <v-btn @click="$root.select(item)"  icon><v-icon>mdi-link</v-icon></v-btn>
                    <v-btn @click="open.more = !open.more" icon><v-icon>mdi-chevron-down</v-icon></v-btn>
            </v-card-title>
            <v-card-actions v-if="open.more"  class="overline">
              Автор: {{creator || 'Аноним'}}<br/>
              Создано {{$moment(item.createdAt).fromNow()}}
              <br/>
              <span v-if="item.updatedAt">
            Отредактировано  {{$moment(item.updatedAt).fromNow()}}</span><br/>

          </v-card-actions>
            <card-actions
              :open="open"
              @add="open.add=!open.add"
              v-show="open.more"
              :item="item"></card-actions>

            <v-expand-transition>

              <v-container v-if="links && open.more">
                <v-card-text class="ma-0 pa-0"
                   v-for="(linked,linksKey) in links">
                      <feed :host="item" :type="linksKey" />
                </v-card-text>
              </v-container>

            </v-expand-transition>


        </v-card>
  `,
  computed: {
    linkTypes() {
      let links=[];
      let {item,$root} = this;
      let type = this.item.type;
      if ($root.types[item.type]) {
        links = $root.types[item.type].links
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
    isEmpty(obj) {
       for (var x in obj) { return false; }
       return true;
    },
  }
}
