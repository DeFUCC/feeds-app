import {types} from '../schema/types.js'

export default {
  data() {
    return {
      types,
    }
  },
  template: `
  <v-sheet>

      <v-sheet v-if="true">
        <v-btn tile depressed color="#bbb" small
          :text="!type.active" v-for="type in types"
          :key="type.title"
          @click="type.active=!type.active">
          {{type.title}}
        </v-btn>
      </v-sheet>

      <v-card color="#eee" >

          <v-slide-x-transition tag="v-row" class="flex-nowrap" style="overflow-x:scroll;overflow-y:hidden; scroll-snap-type: x mandatory; height:100vh" group >


            <v-col :ref="'ref'+type.type" style="flex:1 1 320px; min-width:320px; scroll-snap-align: start;" v-for="(type,key) in activeTypes" :key="type.type">

                <feed :host="$store.selected" :base="true" :type="type.type" :key="key"></feed>

            </v-col>
            </v-slide-x-transition>


      </v-card>

  </v-sheet>
  `,
  created() {
    for (let type in this.types) {
      this.$set(this.types[type],'active',false)
    };
    this.types.design.active = true
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
      this.$refs.refdesign[0].scrollIntoView({inline: 'start', behavior: 'smooth'})
    }
  },
};
