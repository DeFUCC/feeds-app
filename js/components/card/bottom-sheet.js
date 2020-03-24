import itemCard from './item-card.js'
import cardInfo from './card-info.js'
import cardTitle from './card-title.js'
import cardActions from './card-actions.js'
import addForm from './add-form.js'

export default {
  props: {
    item:Object,
  },
  components:{
    itemCard,
    cardInfo,
    cardTitle,
    cardActions,
    addForm,
  },
  data() {
    return{
      linking:false,
      open:true,
      more:false,
      edit:false,
    }
  },
  template:`
    <v-bottom-sheet transition="slide-y-transition" inset v-model="open" class="flex-nowrap" :key="$soul(item)" >

      <v-card height="75vh"
        :style="{border: '2px solid ' + $color.hex($soul(item))}"
        style="overflow:scroll"
        >

        <card-title :item="item" :sheet="true" @open="more = !more">
        </card-title>

        <card-actions
          @linking="activateLinking"
          :open="more"
          v-if="more"
          :sheet="true"
          :item="item"></card-actions>

        <v-expand-transition>

              <add-form v-if="edit"
                @edited="updateItem"
                :edit="item">
              </add-form>


        </v-expand-transition>

        <card-info
          :open="true"
          :item="item"
          @edit="edit=!edit"
          ></card-info>

        <v-expand-transition>
          <v-container v-if="linkTypes">
            <v-row class="ma-0 pa-0"
               v-for="link in linkTypes" :key="$soul(item)+link">
               
                  <feed :host="item" :type="link" />

            </v-row>
          </v-container>
        </v-expand-transition>
      </v-card>
    </v-bottom-sheet>

  `,
  methods: {
    updateItem(edited) {
      this.item=edited;
      this.$root.edit=false;
    },
    activateLinking(ev) {
      this.linking = ev
    }
  },
  watch: {
    open(val) {
      if (!val) {
        this.$root.select()
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
}
