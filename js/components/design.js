import {getItem} from '../gun-db.js'

export default {
  props: [],
  data() {
    return {
      design:{},
    }
  },
  created() {
    getItem(this.$route.params.id, (data) => {
      this.design = data
    })
  },
  template:`
    <v-card class="ma-2">

      <v-card-title>{{design.title}}</v-card-title>

    </v-card>
  `,

}
