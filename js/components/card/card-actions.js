
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
      <v-btn @click="$root.toLink=item" icon><v-icon>mdi-link</v-icon></v-btn>
      <v-btn  @click="copy(item.type+': '+$soul(item))"  icon>
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
       <v-btn  icon @click="ban(item)"><v-icon :style="{color: item.banned ? 'red' : 'grey'}">mdi-cancel</v-icon></v-btn>
       <v-btn  icon  @click="deleteNode(item)"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
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
    ban(item) {
      if (!item.banned) {
        let banned = this.$gun.get(item.type).get(this.$soul(item)).proptag('banned',this.notify)
      } else {
        this.$gun.get(item.type).get(this.$soul(item)).untag('banned',this.notify)
      }
    },
    deleteNode(item, type) {
      let toDel = this.$gun.get('idea').get(this.$soul(item));

      toDel.put({VOID:true}, this.notify)
    },
  },
}
