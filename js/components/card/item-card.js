import cardActions from './card-actions.js'
import addForm from './add-form.js'
import editable from './editable.js'

export default {
  name:'item-card',
  props: {
    item:Object,
    selected:Boolean,
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
  template:`
        <v-card
          :id="$soul(item)"
          :raised="selected"
          :outlined="!selected">
            <v-card-title
              v-if="item.title || $bus.edit"
              >
                  <editable
                    :item="item"
                    property="title"
                    :selected="selected"
                  />
                    <v-spacer/>
                    <v-btn @click="open.more = !open.more" icon><v-icon>mdi-chevron-down</v-icon></v-btn>
            </v-card-title>

            <v-card-title
              v-if="item.description || $bus.edit">
                <editable
                  :item="item"
                  property="description"
                  :selected="selected"
                  ></editable>
                  <v-spacer/>
                  <v-btn v-if="!item.title" @click="open.more = !open.more" icon><v-icon>mdi-chevron-down</v-icon></v-btn>
            </v-card-title>
            <v-expand-transition>

              <v-container v-if="links && open.more">
                <v-card-text
                   v-for="(linked,linksKey) in links">
                      <feed :host="item" :type="linksKey" />
                </v-card-text>
              </v-container>

            </v-expand-transition>

            <v-card-actions v-if="open.more" style="background-color:#f9f9f9" class="overline">
              Автор: {{creator || 'Аноним'}}<br/>
              Создано {{$moment(item.createdAt).fromNow()}}
              <span v-if="item.editedAt"><br/>
            Отредактировано  {{$moment(item.editedAt).fromNow()}}</span><br/>

          </v-card-actions>

            <card-actions
              :open="open"
              @add="open.add=!open.add"
              v-show="open.more"
              :item="item"></card-actions>

        </v-card>
  `,
  computed: {
    linkTypes() {
      let links=[];
      let {item,$bus} = this;
      let type = this.item.type;
      if ($bus.types[item.type]) {
        links = $bus.types[item.type].links
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
      let soul = this.item.createdBy;
      if (soul) {
        let user = await this.$gun.user(soul)
        this.creator = user.alias
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
