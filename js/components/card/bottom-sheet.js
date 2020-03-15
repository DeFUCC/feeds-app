import itemCard from './item-card.js'
import editable from './editable.js'
import cardInfo from './card-info.js'
import addForm from './add-form.js'

export default {
  props: {
    item:Object,
  },
  components:{
    itemCard,
    editable,
    cardInfo,
    addForm,
  },
  data() {
    return{
      open:true,
      edit:false,
    }
  },
  methods: {
    updateItem(it) {
      this.edit=false;
      this.item=it
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

            <h2 @click="$root.select(item)" v-if="item.title" class="pointer" :class="{title:item.type!='icon',
            'display-2':item.type=='icon'}">
              {{finalTitle}}
            </h2>

            <span @click="$root.select(item)" v-if="item.description" class="body-1 pointer" v-html="item.description">
            </span>
            <v-spacer />
              <v-btn icon v-if="$root.loggedIn" :disabled="item.createdBy && item.createdBy!=$user.is.pub"  @click="edit=!edit">
                  <v-icon :color="edit ? 'orange':'#555'">mdi-pencil-outline</v-icon>
              </v-btn>
        </v-card-title>
        <v-expand-transition>
          <add-form v-if="edit" @edited="updateItem" :edit="item"/>
        </v-expand-transition>
        <card-info
          :open="true"
          :item="item"
          />

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
    finalTitle() {
      let title = this.item.title;
      if(this.item.stress) {
        title = this.$root.stressedWord(title,this.item.stress)
      }
      return title
    },
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
