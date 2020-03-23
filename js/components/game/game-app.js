
import {types} from '../../types.js'


export default {
  props: {

  },
  components: {

  },
  data() {
    return {
      title:'Играем в ЭТОВОТЭТО онлайн',
      types
    }
  },
  created() {

  },
  watch: {

  },
  computed: {
    activeTypes() {
      let active={};
      for (let type in this.types) {
        if (this.types[type].active) {
          active[type]=this.types[type]
        }
      }
      return active
    }
  },
  methods: {

  },
  template: `
  <v-sheet style="height:auto;overflow-x:hidden; overflow-y: scroll;scroll-snap-type: y mandatory; overscroll-behavior:none">


      <v-card style="overscroll-x-behavior:none; scroll-snap-align:start;max-height:auto" color="#eee" >

          <v-slide-x-transition tag="v-row" class="flex-nowrap" style="overflow-x:scroll;overflow-y:hidden; scroll-snap-type: x mandatory;" group>

          <v-col class="pa-2" :key="'sd'" style="flex:1 1 320px; min-width:320px; max-width:900px; scroll-snap-align: start;">
            <v-container>

            <h2 class="font-weight-regular">{{title}}</h2>



            </v-container>

            <feed :base="true" type="game" :key="'dd'"></feed>

          </v-col>


            </v-slide-x-transition>


      </v-card>

  </v-sheet>
  `,

};
