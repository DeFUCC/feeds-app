import cardActions from './card-actions.js'
import addForm from './add-form.js'
import cardInfo from './card-info.js'
import cardTitle from './card-title.js'

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
    cardInfo,
    cardTitle,
  },
  data() {
    return {
      links:{},
      linking:false,
      open: {
        add:false,
        more:false,
      },
      edit: false,
      creator:null,
      type:'',
    }
  },
  mounted() {
    if(this.more) {
      this.open.more=true;
    }
  },
  computed: {
    privateBorder() {
      let px=0;
      let step=4;
      if (this.item.createdBy) {
        px+=step
      }
      if (this.$soul(this.item).includes('~')) {
        px+=step
      }
      return px
    }
  },
  template:`
        <v-card
          transition="slide-y-transition"
          :id="$soul(item)"
          :raised="selected || linking"
          :outlined="!selected"
          :style="{borderLeft: '4px solid ' + $color.hex( $soul(item) ), borderRight: item.createdBy ? privateBorder + 'px solid' + $color.hex( '~' + item.createdBy ) : 'none' }">

            <card-title
              style="position:sticky;top:0; background-color:#fff; z-index:5;"
              :item="item"
              @open="open.more = !open.more"
              @unclose="$emit('unclose')"
              :open="open.more"
              ></card-title>

              <p v-show="open.more"
                :style="{opacity:$store.toLink && $store.toLink!=item ? '0.5' : '1'}"
                v-html="item.description"
                v-if="item.description"
                class="body-1 my-2 pa-2"
                > </p>

            <card-info
              :open="open.more"
              v-if="open.more"
              :item="item"
              @edit="edit=!edit"
              ></card-info>

            <v-expand-transition>

                  <add-form v-if="open.more && edit"
                    @edited="updateItem"
                    :edit="item"
                    :type="item.type">
                  </add-form>

            </v-expand-transition>

            <card-actions
              @linking="activateLinking"
              @type="toggleType"
              @close="$emit('close');open.more=false"
              :activeType="type"
              :open="open.more"
              v-if="open.more"
              :sheet="false"
              :item="item"></card-actions>

            <v-expand-transition>

              <feed v-if="open.more && type" :key="type" :host="item" :type="type" />

            </v-expand-transition>

        </v-card>
  `,

  methods: {
    updateItem(edited) {
      this.item=edited;
      this.edit=false;
    },
    toggleType(type) {
      if (this.type==type) {
        this.type=null
      } else {
        this.type=type
      }
    },
    activateLinking(ev) {
      this.linking = ev
    }
  }
}
