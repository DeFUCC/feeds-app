
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
      <v-btn  @click="copy(item.type+': '+$soul(item))"  icon>
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      <v-btn @click="$root.toLink=item" icon><v-icon>mdi-link</v-icon></v-btn>
      <v-btn @click="$root.see(item)"  v-if="$user.is" icon><v-icon v-if="$root.seen[$soul(item)]">mdi-eye</v-icon><v-icon v-else>mdi-eye-off</v-icon></v-btn>
    </v-card-actions>
  </v-expand-transition>
  `,
  methods: {
    copy(soul) {
      if(navigator.clipboard) {
        navigator.clipboard.writeText(soul).then(() => {
          let copied = 'Key copied: '+ soul;
          this.$root.$emit('notify', copied)
        }, (err) => {
          console.error('Error copying ', err);
        });
      } else {
        this.$root.$emit('notify','can not copy')
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
