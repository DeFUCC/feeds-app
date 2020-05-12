
export default {
  name:'card-info',
  props: {
    item:Object,
    open:Boolean,
  },
  data() {
    return{
      note:'',
      creator:'',
      editor:'',
      creatorLink:'',
    }
  },
  created() {
    if (this.item.createdBy) {
      this.$gun.user(this.item.createdBy).on((user) => {
        if (user && user.alias) {
          this.creator = user.alias
          this.creatorLink = window.location.origin + '#/?item=~'+ user.pub;
        }
      })
    }

    if (this.item.updatedBy) {
      this.$gun.user(this.item.updatedBy).on((user) => {
        if (user && user.alias) {
          this.editor = user.alias
        }
      })
    }
  },

  template:`
  <v-expand-transition>
    <v-card-actions style="z-index:42" dense :style="{backgroundColor: creator ? $color.hex('~'+item.createdBy) : '#f2f2f2'}" class="overline">
        <v-btn :href="creatorLink" icon>
          <v-icon v-if="item.createdBy && !$soul(item).includes('~')">mdi-account-outline</v-icon>
          <v-icon v-if="$soul(item).includes('~')">mdi-account-lock-outline</v-icon>
          <v-icon v-if="!item.createdBy && !$soul(item).includes('~')">mdi-cloud-outline</v-icon>
      </v-btn>
      <span >
        {{creator || 'Аноним'}}:  {{$moment(item.createdAt).fromNow()}}

        <span v-if="item.updatedAt">
          <br> ред. <span v-if="creator != editor">
            {{editor}}
          </span> {{$moment(item.updatedAt).fromNow()}}

        </span>
      </span>
      <v-spacer></v-spacer>
      <v-btn icon
        v-if="$store.loggedIn"  @click="$emit('edit')">
          <v-icon>
            mdi-pencil-outline
          </v-icon>
      </v-btn>
    </v-card-actions>
  </v-expand-transition>
  `,
  methods: {

  },
}
