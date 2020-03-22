import itemCard from './item-card.js'
import cardInfo from './card-info.js'
import cardTitle from './card-title.js'
import addForm from './add-form.js'

export default {
  props: {
    item:Object,
  },
  components:{
    itemCard,
    cardInfo,
    cardTitle,
    addForm,
  },
  data() {
    return{
      open:true,
    }
  },
  template:`
    <v-bottom-sheet transition="slide-y-transition" inset v-model="open" class="flex-nowrap" :key="$soul(item)" >

      <v-card height="75vh"
        :style="{border: '2px solid ' + $color.hex($soul(item))}"
        style="overflow:scroll"
        >

        <card-title :item="item" :sheet="true">
        </card-title>

        <v-expand-transition>

              <add-form v-if="$root.edit"
                @edited="updateItem"
                :edit="item">
              </add-form>


        </v-expand-transition>

        <card-info
          :open="true"
          :item="item"
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
    }
  },
  watch: {
    open(val) {
      if (!val) {
        this.$root.selected=null;
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
