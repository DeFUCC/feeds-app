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
        style="overflow-y:scroll; overflow-x:hidden"
        >

        <card-title
          style="position:sticky;top:0; background-color:#fff; z-index:40;"
          :item="item"
          :sheet="true"
          @open="more = !more">
        </card-title>

        <p
          :style="{opacity:$store.toLink && $store.toLink!=item ? '0.5' : '1'}"
          v-html="item.description"
          v-if="item.description"
          class="body-1 my-2 pa-2"
          > </p>

        <card-actions
          @linking="activateLinking"
          :open="more"
          v-if="more"
          :sheet="true"
          :item="item"></card-actions>

        <v-expand-transition>

              <add-form v-if="edit"
                @edited="edit=false"
                @added="edit=false"
                :edit="item"
                :type="item.type">
              </add-form>


        </v-expand-transition>

        <card-info
          :open="true"
          :item="item"
          @edit="edit=!edit"
          ></card-info>

        <v-expand-transition>
          <v-container class="ma-0 pa-0" v-if="linkTypes">
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
    activateLinking(ev) {
      this.linking = ev
    }
  },
  watch: {
    open(val) {
      if (!val) {
        this.$store.select()
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
