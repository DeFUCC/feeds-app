import {cleanMap, stressedWord} from '../../help.js'
import innerContent from './inner-content.js'

export default {
  name:'card-content',
  props: {
    item:Object,
    finish:Boolean,
  },
  components:{
    innerContent
  },
  data() {
    return{
      linkRef:{},
      links:{},
      listState:'',
    }
  },
  mounted() {
    let link = this.$bus.types[this.item.type].link
    this.linkRef =  gun.get(this.item.type)
      .get(this.$soul(this.item))
      .get(link);

    this.linkRef.map().on((data,key) => {
        this.$set(this.links,key,data)
      })
  },
  template:`
      <v-expand-transition>
        <v-list>
            <v-list-group
              v-for="(link, key) in actualLinks"
              :key="key"
              v-model="link.active"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content @click="expandLink(link)">
                  <v-list-item-title  v-if="link.letters" class="the-word" style="font-size:1.2em">
                  {{stressedWord(link)}}
                  </v-list-item-title>
                  <v-list-item-text class="pointer" v-if="link.text" >
                    {{link.text}}
                  </v-list-item-text>
                </v-list-item-content>
              </template>

              <inner-content :linkRef="linkRef" :item="link"></inner-content>

           </v-list-group>
          </v-list>
       </v-sheet>
      <v-expand-transition>
  `,
  methods: {
    expandLink(link) {
      console.log(link)

    },
    select(link) {
      this.$bus.selected = link;
      if(link.type=='words') {this.$bus.tabs=0};
      if(link.type=='meanings') {this.$bus.tabs=1};
      setTimeout(this.goTo, 500);
    },
    goTo() {
      this.$vuetify.goTo('#'+ this.$soul(this.$bus.selected))
    },
    stressedWord,
    ban (item) {
      if (item.banned) {
        this.linkRef.get(this.$soul(item)).untag('banned')
      } else {
        this.linkRef.get(this.$soul(item)).proptag('banned')
      }

    //  this.linkRef.get(this.$soul(item)).proptag('banned')
    },
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
      return cleanMap(linkList)
    }
  },
  beforeDestroy() {
    this.linkRef.map().off();
  }
}
