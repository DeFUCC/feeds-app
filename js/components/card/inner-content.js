import gun from '../../gundb.js'
import {cleanMap, stressedWord} from '../../help.js'

export default {
  name:'inner-content',
  props: {
    item:Object,
    finish:Boolean,
    linkRef:Object,
  },
  components:{
  },
  data() {
    return{
      links:{},
      listState:'',
    }
  },
  mounted() {
    let link = this.$bus.types[this.item.type].link

    this.linkRef.get(this.$soul(this.item)).get(link).map().on((data,key) => {
        console.log(key,data.text)
        this.$set(this.links,key,data)
      })
  },
  template:`
      <v-expand-transition>
        <v-list>
          <v-list-item
            v-for="(link, key) in actualLinks"
            :key="key"
            v-model="link.active"
            no-action
          >

              <v-list-item-content @click="expandLink(link)">
                <v-list-item-title  v-if="link.letters" class="the-word" style="font-size:1.2em">
                {{stressedWord(link)}}
                </v-list-item-title>
                <v-list-item-text class="pointer" v-if="link.text" >
                  {{link.text}}
                </v-list-item-text>
              </v-list-item-content>

         </v-list>
       </v-list>
      <v-expand-transition>
  `,
  methods: {
    expandLink(link) {
      console.log(link)
    },
    stressedWord,
  },
  computed: {
    actualLinks () {
      let linkList=[];
      for (let key in this.links) {
        let link = this.links[key];
        if (link && (!link.banned || this.$bus.show.banned)) {
          linkList.push(link)
        }
      }
      return linkList
    }
  },
}
