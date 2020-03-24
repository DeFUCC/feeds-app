
export default {
  props: {
    item:Object,
    closed:Boolean,
    sheet:Boolean,
    open:Boolean,
  },
  data() {
    return{
      note:'',
      ahref:'',
    }
  },
  computed:{
    theTitle() {
      let {title , stress } = this.item
      if (this.item.alias) {return this.item.alias}
      if (!title) {return null}
      if (!stress || typeof title != 'string') { return title }
      let arr = title.split('');
      let parts = [];
      if (arr.length > 0) {
        arr[0] = arr[0].toUpperCase();
        parts[0] = arr.slice(0, stress+1).join('');
        parts[1] = '\u0301';
        parts[2] = arr.slice(stress+1).join('');
      }
      return parts.join('')
    }
  },
  template:`
  <v-card-title
    @click="closed ?  $emit('unclose') : $root.select(item)"
    class="pointer py-1 px-2"
    :class="{closed}">

    <span style="max-width:85%">
      <h2
        :style="{opacity:$root.toLink ? '0.5' : '1'}"
        v-if="item.title && !closed"
        :class="{title:item.type!='icon',
      'display-2':item.type=='icon'}"
      >
        {{theTitle}}
      </h2>

      <p
        :style="{opacity:$root.toLink ? '0.5' : '1'}"
        v-html=""
        v-if="item.description && !closed"
        class="body-1 my-2"
        >
        {{item.description}}
      </p>
    </span>

      <v-spacer/>
      <h2 v-if="closed">&nbsp;</h2>

      <span style="max-width:15%">

        <v-btn icon
          @click.stop.prevent="$root.see(item)"
          v-if="$root.loggedIn && $root.seen[$soul(item)] && !closed">
          <v-icon>mdi-eye-off</v-icon>
        </v-btn>

        <v-btn icon
          v-if="$root.toLink && $root.toLink.type != item.type" @click.stop.prevent="$root.toLinkTo(item.type, $soul(item))" >
          <v-icon>mdi-link</v-icon>
        </v-btn>

        <v-btn icon
          v-if="!$root.toLink && !closed" @click.stop.prevent="$emit('open')" :class="{turn180:open}" >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>



    </span>

  </v-card-title>
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
  }
}
