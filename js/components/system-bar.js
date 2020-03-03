import gun from '../gundb.js'

export default {
  props: {
    item:Object,
    open:Object,
  },
  data() {
    return{
      note:'',
    }
  },
  template:`
  <v-expand-transition>
    <v-system-bar>
      <v-spacer></v-spacer>
      <v-btn small @click="copy(item.type+': '+$soul(item))"  icon>
        <v-icon>mdi-link</v-icon>
      </v-btn>
       <v-btn small icon @click="ban(item)"><v-icon :style="{color: item.banned ? 'red' : 'grey'}">mdi-cancel</v-icon></v-btn>
       <v-btn small icon  @click="deleteNode(item,getMode())"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
    </v-system-bar>
  </v-expand-transition>
  `,
  methods: {
    getMode() {
      if (this.$bus.tabs == 1) { return 'meanings' }
      if (this.$bus.tabs == 0) { return 'words' }
    },
    copy(soul) {
      if(navigator.clipboard) {
        navigator.clipboard.writeText(soul).then(() => {
          let copied = 'Key copied: '+ soul;
          this.$bus.$emit('notify', copied)
        }, (err) => {
          console.error('Error copying ', err);
        });
      } else {
        this.$bus.$emit('notify','can not copy')
      }

    },
    notify(message) {
      console.log(message)
      this.$bus.$emit('notify', message)
    },
    ban(item) {
      if (!item.banned) {
        let banned = gun.get(item.type).get(this.$soul(item)).proptag('banned',this.notify)
      } else {
        gun.get(item.type).get(this.$soul(item)).untag('banned',this.notify)
      }
    },
    deleteNode(item, type) {
      if (!type) {type = item.type }
      let toDel = gun.get(type).get(this.$soul(item))
      toDel.put(null,this.notify)
    },
  },
}
