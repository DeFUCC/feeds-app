
export default {
  props: {
    item:'Object',
    open:Object,
  },
  data() {
    return{
      note:'',
    }
  },
  template:`
  <v-expand-transition>
    <v-card-actions :style="{background: $color.hex($soul(item))}">
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
        let ahref = '<a target="_blank" color="white" href=' + copied + '>Item URL</a>';

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
