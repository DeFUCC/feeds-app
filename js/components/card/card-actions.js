
export default {
  props: {
    item:Object,
    open:Object,
  },
  data() {
    return{
      note:'',
      wordCount:0,
      links:[],
      linksCount:{},
    }
  },
  created() {
    let {item, $root, $gunroot, $soul} = this;
    let type = item.type;
    if ($root.types[type]) {
      this.links = $root.types[type].links
    }
    for (let link of this.links) {
      this.$set(this.linksCount,link,0)
      $gunroot.get($soul(item)).get(link).map().once((data,key) => {
        this.linksCount[link]++
      })
    }
  },
  template:`
  <v-expand-transition>
    <v-card-actions v-if="open" :style="{background: $color.hex($soul(item))}">
      <v-btn v-for="(count, type) in linksCount"  icon>{{$root.types[type].title.slice(0,1)}}:{{count}}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn  @click="copy($soul(item))"  icon>
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      <v-btn @click="link()" icon><v-icon>mdi-link</v-icon></v-btn>
      <v-btn @click="$root.see(item)"  v-if="$user.is" icon><v-icon v-if="$root.seen[$soul(item)]">mdi-eye</v-icon><v-icon v-else>mdi-eye-off</v-icon></v-btn>
    </v-card-actions>
  </v-expand-transition>
  `,
  methods: {
    link() {
      let {$root, item} = this
      if ($root.toLink==item) {
        $root.toLink=null
        this.$emit('linking',false)
      } else {
        $root.toLink=item;
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
