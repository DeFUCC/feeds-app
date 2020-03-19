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
      edit: {
        title:false,
        description:false,
      },
      creator:null,
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
          :style="{borderBottom: '2px solid ' + $color.hex($soul(item))}">

            <card-title :item="item" @open="open.more = !open.more">
            </card-title>

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
