import cardActions from './card-actions.js'
import addForm from './add-form.js'
import editable from '../editable.js'
import cardInfo from './card-info.js'

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
    cardInfo,
  },
  data() {
    return {
      links:{},
      linking:false,
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
          :raised="selected || linking"
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
                    <v-btn v-if="!$root.toLink" @click="open.more = !open.more" :class="{turn180:open.more}" icon><v-icon>mdi-chevron-down</v-icon></v-btn>
                      <v-btn @click="$root.see(item)"  v-if="$user.is && $root.seen[$soul(item)]" icon><v-icon>mdi-eye-off</v-icon></v-btn>
            </v-card-title>
            <card-info
              :open="open.more"
              v-show="open.more"
              :item="item"
              ></card-info>
            <card-actions
              @linking="activateLinking"
              :open="open.more"
              v-show="open.more"
              :item="item"></card-actions>

        </v-card>
  `,

  methods: {
    activateLinking(ev) {
      this.linking = ev
    }
  }
}
