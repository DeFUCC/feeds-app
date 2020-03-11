const blankItem = {
    title:'',
    description:'',
    createdAt:null,
    updatedAt:null,
    createdBy:null,
    VOID:null,
    links:{},
  }

export default {
  props: {
    host: Object,
    type:{
      type: String,
      default:'idea',
    },
  },
  data() {
    return{
      valid:false,
      item: {...blankItem},
    }
  },
  created() {
    this.item.type=this.type;
  },
  template:`
    <v-container style="padding-top:0">
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col cols="12" v-for="field in linkType.fields">
            <v-text-field v-if="field.type=='text'"
              v-model="item[field.name]"
              :label="field.label"></v-text-field>
            <v-textarea v-if="field.type=='textarea'"  rows="2" v-model="item.description" label="Описание"></v-textarea>
          </v-col>
          <v-col>
            <v-btn :disabled="!item.title && !item.description" @click="createItem()">Добавить</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  `,
  computed: {
    linkType() {
      let linkType = this.$root.types[this.type]
       return linkType;
    }
  },
  methods: {
    async createItem() {
      let {host, item, type, $gun, $soul, $user} = this;
      let it = {...item}
      it.createdAt = this.$state();
      console.log(it)
      if ($user.is) {
        it.createdBy = $user.is.pub;
        it = await $user.get(type).set(it)
      }

       it = await $gun.get(type).set(it);

       if (host) {
        await this.interlink(host.type,$soul(host),type,$soul(it))
       }
       this.reset(it);
       return it
    },
    async interlink (hostType, host, itemType, item) {
      let hoster =  this.$gunroot.get(host);
      let theitem = this.$gunroot.get(item);
      let itm = await hoster.get(itemType).set(theitem);
      let hstr = await theitem.get(hostType).set(hoster)
    },
    reset(status) {
      console.log(status)
      this.$emit('added')
      this.$forceUpdate();
      this.$root.$forceUpdate();
      this.item={...blankItem};
      this.$root.selected=''
    }
  },
}
