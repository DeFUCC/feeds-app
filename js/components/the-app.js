import appInfo from "./app/app-info.js";
import {types} from '../types.js'


export default {
  props: {

  },
  components: {
    appInfo
  },
  data() {
    return {
      title:'ЭТОВОТЭТО',
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
  <v-sheet style="height:98vh;overflow-x:hidden; overflow-y: scroll;scroll-snap-type: y mandatory; overscroll-behavior:none">


      <v-sheet>
        <v-btn tile depressed color="#bbb" small :text="!type.active" v-for="type in types" @click="type.active=!type.active">{{type.title}} </v-btn>
      </v-sheet>

      <v-card style="overscroll-x-behavior:none; scroll-snap-align:start;max-height:98vh" color="#eee" >

          <v-slide-x-transition tag="v-row" class="flex-nowrap" style="overflow-x:scroll;overflow-y:hidden; scroll-snap-type: x mandatory;" group>

          <v-col class="pa-2" :key="'sd'" style="flex:1 1 320px; min-width:320px; max-width:900px; scroll-snap-align: start;">
            <v-container>

            <h1 class="font-weight-regular">{{title}}</h1>

            </v-container>

            <app-info ></app-info>

          </v-col>

            <v-col style="flex:1 1 320px; min-width:320px; scroll-snap-align: start;" v-for="(type,key) in activeTypes" :key="type.type">

                <feed :base="true" :type="type.type" :key="key"></feed>

            </v-col>
            </v-slide-x-transition>


      </v-card>

  </v-sheet>
  `,

};
