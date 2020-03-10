import cardActions from './card-actions.js'
import addForm from './add-form.js'
import editable from './editable.js'

export default {
  name:'card',
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
      open: {
        add:false,
      },
      edit: {
        title:false,
        description:false,
      },
      creator:null,
    }
  },
  created() {
    if(this.item.createdBy) {
      this.$gun.user(this.item.createdBy).once((user) =>{
        this.creator = user.alias
      });
    }
    this.item.links = this.item.links || {};

    for (let link of this.links) {
      this.item.links[link]={};
      this.$gun.get(this.item.type)
               .get(this.$soul(this.item))
               .get(link).map().on( ( lnk, key ) => {
                  this.item.links[link][key] = lnk
                })
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
                    class="title font-weight-regular"
                    :item="item"
                    property="title"
                    :selected="selected"
                  />
                    <v-spacer/>
                    <v-btn @click="$bus.$emit('select',item)" icon><v-icon>mdi-chevron-down</v-icon></v-btn>
            </v-card-title>

            <v-card-text
              v-if="item.description || $bus.edit">

                <editable
                  class="body-1 font-weight-regular"
                  :item="item"
                  property="description"
                  :selected="selected"
                  ></editable>
                  <v-btn v-if="!item.title" @click="$bus.$emit('select',item)" icon><v-icon>mdi-chevron-down</v-icon></v-btn>
            </v-card-text>
            <v-card-text
              v-if="item.links">
                  <v-row v-for="links in item.links">
                    <v-col v-for="link in links">
                      {{link.title || link.description}}
                    </v-col>
                  </v-row>
            </v-card-text>

            <v-expand-transition>
              <v-card-text
                style="padding-top:0" v-if="open.add && selected">
                  <add-form :hostid="$soul(item)" :hosttype="item.type" v-for="link in links" :type="link" :key="link" @added="open.add=false"></add-form>
              </v-card-text>
            </v-expand-transition>

            <v-card-actions v-if="selected" style="background-color:#f9f9f9" class="overline">
              Автор: {{creator || 'Аноним'}}<br/>
              Создано {{$moment(item.createdAt).fromNow()}}
              <span v-if="item.editedAt"><br/>
            Отредактировано  {{$moment(item.editedAt).fromNow()}}</span><br/>

          </v-card-actions>

            <card-actions
              :open="open"
              @add="open.add=!open.add"
              v-show=" selected"
              :item="item"></card-actions>

        </v-card>
  `,
  computed: {
    links() {
      let linksList=[];
      let type = this.item.type;
      let links = this.$bus.types[type].links
      for (let l in links) {
        linksList.push(l)
      }
      return linksList
    }
  },
  methods: {

  }
}
