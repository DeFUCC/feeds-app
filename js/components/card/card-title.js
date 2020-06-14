export default {
  props: {
    item: Object,
    closed: Boolean,
    sheet: Boolean,
    open: Boolean
  },
  data() {
    return {note: '', ahref: ''}
  },
  computed: {
    theType() {
      return this.$root.types[this.item.type]
    }
  },
  template: `
  <v-card-title
    @click="$store.select(item)"
    class="pointer py-1 px-2"
    :class="{closed}">

    <span style="max-width:85%">
      <h5 v-if="sheet">{{theType.name}}</h5>
      <h2
        :style="{opacity:$store.toLink && $store.toLink!=item ? '0.5' : '1'}"
        v-if="item.title"
        :class="{title:item.type!='icon',
      'display-2':item.type=='icon'}"
      >
        {{item.title}}
      </h2>

    </span>

      <v-spacer/>

      <span style="max-width:15%">

        <v-btn icon x-small class="ma-2"
          @click.stop.prevent="$store.see(item)"
          v-if="$store.loggedIn && $store.seen[$soul(item)]">
          <v-icon>mdi-eye-off</v-icon>
        </v-btn>

        <v-btn icon
          v-if="$store.toLink && $store.toLink.type != item.type" @click.stop.prevent="$store.linkTo(item)" >
          <v-icon>mdi-link</v-icon>
        </v-btn>

        <v-btn icon
          v-if="!$store.toLink" @click.stop.prevent="$emit('open')" :class="{turn180:open}" >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>

    </span>

  </v-card-title>
  `,
  methods: {
    link() {
      let {$root, item} = this
      if ($store.toLink == item) {
        $store.toLink = null
        this.$emit('linking', false)
      } else {
        $store.toLink = item;
        this.$emit('linking', true)
      }
    }
  }
}
