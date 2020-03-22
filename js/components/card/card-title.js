
export default {
  props: {
    item:Object,
    closed:Boolean,
    sheet:Boolean,
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
  <v-card-title @click="$root.selected=item"  class=" pointer py-1 px-2">
    <span style="max-width:85%">
      <h2
        :style="{opacity:$root.toLink ? '0.5' : '1'}"

        v-if="item.title && !closed" :class="{title:item.type!='icon',
      'display-2':item.type=='icon'}"
      >
        {{theTitle}}
      </h2>

      <p
        :style="{opacity:$root.toLink ? '0.5' : '1'}"
        v-html=""
        v-if="item.description && !closed"
        class="body-1"
        >
        {{item.description}}
      </p>
    </span>

      <v-spacer/>

      <v-btn icon
        v-if="closed"
        @click.stop.prevent="closed=false">
        <v-icon>mdi-book-open</v-icon>
      </v-btn>

      <v-btn icon
        v-if="$root.toLink && $root.toLink.type != item.type" @click.stop.prevent="$root.toLinkTo(item.type, $soul(item))" >
        <v-icon>mdi-link</v-icon>
      </v-btn>

      <v-btn icon
        v-if="!$root.toLink && !closed && !sheet" @click.stop.prevent="$emit('open')" :class="{turn180:open.more}" >
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>

      <v-btn icon
        @click.stop.prevent="$root.see(item)"
        v-if="$user.is && $root.seen[$soul(item)] && !closed">
        <v-icon>mdi-eye-off</v-icon>
      </v-btn>

      <v-btn icon
        v-if="sheet"
        :disabled="!$root.loggedIn"  @click.stop.prevent="$root.edit=!$root.edit">
          <v-icon
            :color="$root.edit ? '#f66' :'#555'">
            mdi-pencil-outline
          </v-icon>
      </v-btn>

  </v-card-title>
  `,
}
