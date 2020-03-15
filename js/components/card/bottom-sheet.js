import itemCard from './item-card.js'
import editable from '../editable.js'
import cardInfo from './card-info.js'

export default {
  props: {
    item:Object,
  },
  components:{
    itemCard,
    editable,
    cardInfo,
  },
  data() {
    return{
      open:true,
    }
  },
  template:`
    <v-bottom-sheet inset v-model="open" class="flex-nowrap" v-if="item" >
      <v-card height="75vh"
        :style="{border: '2px solid ' + $color.hex($soul(item))}"
        style="overflow:scroll"
        >

        <v-card-title style="position:sticky; top:0;background-color:#eee" class="py-4 px-4 pointer"
          >
              <editable
                v-if="item.title"
                :item="item"
                property="title"
              />
              <editable
                v-if="item.description"
                :item="item"
                property="description"
                ></editable>
              <v-spacer/>

              <v-btn icon :disabled="!$root.loggedIn"  @click="$root.edit=!$root.edit">
                  <v-icon :color="$root.edit?'orange':'#555'">mdi-pencil-outline</v-icon>
              </v-btn>
        </v-card-title>

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
  watch: {
    open(val) {
      if (!val) {
        this.$root.select(this.item)
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
