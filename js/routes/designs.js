import {getTypeItems} from '../gun-db.js'

export default {
  components: {

  },
  data() {
    return {
      designs:{},
    }
  },
  template: `
  <v-sheet>

    <v-card class="ma-3" v-for="(design, key) in designs" :key="key">

      <v-list-item>


          <router-link tag="v-list-item-content" :to="'design/'+key">
            <v-list-item-title  v-text="design.title"  class="headline" />
            <v-list-item-content v-text="design.description"  />
          </router-link>
        
        <v-list-item-avatar color="#eee"></v-list-item-avatar>
      </v-list-item>

    </v-card>

  </v-sheet>
  `,
  created() {
    getTypeItems('design',undefined, (data,key) => {
      this.$set(this.designs,key,data)
    })
  },
  methods: {

  },

};
