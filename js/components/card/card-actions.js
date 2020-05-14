import { countLinks } from '../../gun-db.js'

export default {
  props: {
    item:Object,
    open:Boolean,
    sheet:Boolean,
    activeType:String,
  },
  data() {
    return{
      note:'',
      wordCount:0,
      links:[],
      linksCount:{},
      active:false,
      seen:{},
    }
  },
  created() {
    let {item, $root, $gunroot, $soul, $gun, $set} = this;
    let type = item.type;

    if ($root.types[type]) {
      this.links = $root.types[type].links
    }

    for (let link of this.links) {
      $set(this.linksCount,link,0)
      countLinks( item, link, () => {
        this.linksCount[link]++
      })
    }

    $gun.get('seen').get($soul(item)).map().once((data,key) => {
        if (data=='seen') {
          $set(this.seen,key,true)
        } else if (this.seen[key]) {
          $set(this.seen,key,false)
        }
    })

  },
  computed: {
    seenNum() {
      let num=0;
      for (let rec in this.seen) {
        if (this.seen[rec]) {
          num++
        }
      }
      return num
    }
  },
  template:`
  <v-expand-transition>
    <v-card-actions v-if="open" :style="{background: $color.hex($soul(item))}">
      <v-btn icon
        v-for="(count, type) in linksCount"
        @click="$emit('type', type);"
        :key="count+type" :class="{'v-btn--outlined':activeType ? $root.types[activeType].type==type : false}">
        {{$root.types[type].title.slice(0,1)}}:{{count}}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon
        v-if="sheet"
        @click="copy($soul(item))">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>


      <v-btn icon @click="link()"><v-icon>mdi-link</v-icon></v-btn>

      <v-btn icon
        @click="$store.loggedIn ? $store.see(item) : $emit('close')"
        >
        <v-icon v-if="$store.seen[$soul(item)]">
          mdi-eye</v-icon>
        <v-icon v-else>mdi-eye-off</v-icon>{{seenNum}}
      </v-btn>
    </v-card-actions>
  </v-expand-transition>
  `,
  methods: {
    link() {
      if (this.$store.toLink==this.item) {
        this.$store.toLink=null
        this.$emit('linking',false)
      } else {
        this.$store.toLink=this.item;
        this.$emit('linking',true)
      }
    },
    copy(soul) {
      if(navigator.clipboard) {
        let copied = window.location.origin + '#/?item='+ soul;
        let ahref = '<a color="white" href=' + copied + '>Item URL</a>';

        navigator.clipboard.writeText(copied).then(() => {
          this.$root.$emit('notify', ahref +' is in your clipboard!')
        }, (err) => {
          console.error('Error copying ', err);
        });
      } else {
        this.$root.$emit('notify', 'Copy this ' + ahref)
      }

    },
    notify(message) {
      console.log(message)
      this.$root.$emit('notify', message)
    },

    deleteNode(item) {
      this.$gun.get(item.type).get(this.$soul(item)).put(null);
    },
  },
}
