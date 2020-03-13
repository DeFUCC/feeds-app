import cardActions from './card-actions.js'
import addForm from './add-form.js'
import editable from '../editable.js'

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
          :style="{borderBottom: '2px solid ' + $color.hex($soul(item))}">
            <v-card-title  class="py-1 px-2"
              >
                <h2 :style="{opacity:$root.toLink ? '0.5' : '1'}" @click="$root.select(item)" style="max-width:85%" v-if="item.title" class="pointer" :class="{title:item.type!='icon',
                'display-2':item.type=='icon'}">
                  {{item.title}}
                </h2>

                <span :style="{opacity:$root.toLink ? '0.5' : '1'}" @click="$root.select(item)" style="max-width:85%" v-if="item.description" class="body-1 pointer">
                  {{item.description}}
                </span>
                    <v-spacer/>
                    <v-btn v-if="$root.toLink && $root.toLink.type != item.type" @click="$root.toLinkTo(item.type, $soul(item))" icon><v-icon>mdi-link</v-icon></v-btn>
                    <v-btn v-if="!$root.toLink" @click="getCreator();open.more = !open.more" :class="{turn180:open.more}" icon><v-icon>mdi-chevron-down</v-icon></v-btn>
                      <v-btn @click="$root.see(item)"  v-if="$user.is && $root.seen[$soul(item)]" icon><v-icon>mdi-eye-off</v-icon></v-btn>
            </v-card-title>
            <v-expand-transition>
              <v-card-actions class="overline" v-if="open.more">
                  <v-btn v-if="item.createdBy && ((item.createdBy && !$user.is) || ($user.is && item.createdBy != $user.is.pub))" icon><v-icon>mdi-lock-outline</v-icon></v-btn>
                  <v-btn v-else icon><v-icon>mdi-lock-open-variant-outline</v-icon></v-btn>
                <span v-show="open.more">
                  Автор: {{creator || 'Аноним'}}<br/>
                  Создано {{$moment(item.createdAt).fromNow()}}
                  <br/>
                  <span v-if="item.updatedAt">
                    Отредактировано  {{$moment(item.updatedAt).fromNow()}}
                  </span>
                </span>
              </v-card-actions>
            </v-expand-transition>
            <card-actions
              :open="open"
              @add="open.add=!open.add"
              v-show="open.more"
              :item="item"></card-actions>

        </v-card>
  `,

  methods: {
    async getCreator() {
      if (this.item.createdBy) {
        let user = await this.$gun.user(this.item.createdBy)

        if (user && user.alias) {
          this.creator = user.alias
        }

      }
    },

  }
}
