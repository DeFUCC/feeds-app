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
    closed:Boolean,
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
      isClosed:false,
      open: {
        add:false,
        more:false,
      },
      edit: false,
      creator:null,
      type:'',
    }
  },
  watch: {
    closed(val) {
      this.isClosed=val
    }
  },
  mounted() {
    if(this.more) {
      this.open.more=true;
    }
  },
  template:`
        <v-card
          transition="slide-y-transition"
          :id="$soul(item)"
          :raised="selected || linking"
          :class="{closed}"
          :outlined="!selected"
          :style="{borderLeft: '4px solid ' + $color.hex($soul(item)), borderRight: item.createdBy ? '4px solid' + $color.hex('~'+item.createdBy) : 'none'}">

            <card-title
              :item="item"
              @open="open.more = !open.more"
              :open="open.more"
              ></card-title>

              <card-info
                :open="open.more"
                v-if="open.more"
                :item="item"
                @edit="edit=!edit"
                ></card-info>

                <v-expand-transition>

                      <add-form v-if="open.more && edit"
                        @edited="updateItem"
                        :edit="item">
                      </add-form>


                </v-expand-transition>

            <card-actions
              @linking="activateLinking"
              @type="toggleType"
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
  computed: {

  },
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
