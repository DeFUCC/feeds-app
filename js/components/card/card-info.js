
export default {
  name:'card-info',
  props: {
    item:'Object',
    open:Object,
  },
  data() {
    return{
      note:'',
      creator:'',
    }
  },
  created() {
    if (this.item.createdBy) {
      this.$gun.user(this.item.createdBy).on((user) => {
        if (user && user.alias) {
          this.creator = user.alias
        }
      })
    }
  },
  template:`
  <v-expand-transition>
    <v-card-actions  class="overline">
        <v-btn v-if="item.createdBy && ((item.createdBy && !$user.is) || ($user.is && item.createdBy != $user.is.pub))" icon><v-icon>mdi-lock-outline</v-icon></v-btn>
        <v-btn v-else icon><v-icon>mdi-lock-open-variant-outline</v-icon></v-btn>
      <span >
        Автор: {{creator || 'Аноним'}}<br/>
        Создано {{$moment(item.createdAt).fromNow()}}
        <br/>
        <span v-if="item.updatedAt">
          Отредактировано  {{$moment(item.updatedAt).fromNow()}}
        </span>
      </span>
    </v-card-actions>
  </v-expand-transition>
  `,
  methods: {

  },
}
