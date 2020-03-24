import appInfo from "./app-info.js";
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
      types,
      refNum:0,
      gameMode:true,
    }
  },
  created() {
    for (let type in this.types) {
      this.$set(this.types[type],'active',true)
    }
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
    scrollRight() {
      this.$refs.refword[0].scrollIntoView({inline: 'start', behavior: 'smooth'})
    }
  },
  template: `
  <v-sheet style="height:auto;overflow-x:hidden; overflow-y: scroll;scroll-snap-type: y mandatory; overscroll-behavior:none">

      <v-sheet v-if="false">
        <v-btn tile depressed color="#bbb" small
          :text="!type.active" v-for="type in types"
          :key="type.title"
          @click="type.active=!type.active">
          {{type.title}}
        </v-btn>
      </v-sheet>

      <v-card style="overscroll-x-behavior:none; scroll-snap-align:start;max-height:auto" color="#eee" >

          <v-slide-x-transition tag="v-row" class="flex-nowrap" style="overflow-x:scroll;overflow-y:hidden; scroll-snap-type: x mandatory;" group >

          <v-col class="pa-2" :key="'sd'" style="flex:1 1 320px; min-width:320px; max-width:900px; scroll-snap-align: start;">
            <v-container>

            <h1 class="font-weight-regular">{{title}}</h1>

            <v-btn small outlined @click="gameMode=!gameMode" class="pointer"><v-icon v-if="gameMode" left>mdi-eye-off</v-icon><v-icon v-else left>mdi-eye</v-icon><span v-if="gameMode">Игра</span><span v-else>Просмотр</span></v-btn>

            <v-btn small outlined @click="scrollRight" class="pointer"><v-icon left>mdi-arrow-right</v-icon><span>Вперед</span></v-btn>


            <app-info  ></app-info>
            </v-container>

          </v-col>

            <v-col :ref="'ref'+type.type" style="flex:1 1 320px; min-width:320px; scroll-snap-align: start;" v-for="(type,key) in activeTypes" :key="type.type">

                <feed :gameMode="gameMode" :base="true" :type="type.type" :key="key"></feed>

            </v-col>
            </v-slide-x-transition>


      </v-card>

  </v-sheet>
  `,

};
