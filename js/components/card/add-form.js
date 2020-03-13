const blankItem = {
    title:'',
    description:'',
    createdAt:null,
    updatedAt:null,
    createdBy:null,
    VOID:null,
  }

export default {
  props: {
    host: Object,
    type:{
      type: String,
      default:'icon',
    },
  },
  data() {
    return{
      valid:false,
      item: {...blankItem},
      search:null,
      creator:false,
    }
  },
  created() {
    this.item.type=this.type;
  },
  template:`
    <v-container class="py-0" style="background-color:#eee">
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col cols="12" class="pa-0" v-for="field in linkType.fields">

            <v-text-field @input="searchIt" outlined v-if="field.type=='text'"
              v-model="item[field.name]"
              :label="field.label"></v-text-field>
            <v-textarea @input="searchIt" outlined v-if="field.type=='textarea'"  rows="2" v-model="item[field.name]" label="Описание"></v-textarea>
          </v-col>
          <v-col cols="3">
            <v-switch v-if="$user.is"
              v-model="creator"
              prepend-icon="mdi-lock-outline"
            ></v-switch>
          </v-col><v-col cols="3">
            <v-btn icon :disabled="!item.title && !item.description" @click="createItem()"><v-icon>mdi-send</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  `,
  computed: {
    linkType() {
      console.log(this.type)
      let linkType = this.$root.types[this.type]
       return linkType;
    }
  },
  methods: {
    searchIt(val) {
      this.$emit('search',val)
    },
    async createItem() {
      let {host, item, type, $gun, $soul, $user, creator} = this;
      let it = {...item}
      it.createdAt = this.$state();

      if ($user.is && creator) {
        it.createdBy = $user.is.pub;
        it = await $user.get(type).set(it)
      }

       it = await $gun.get(type).set(it);
       this.reset(it);
       if (host) {
        it = await this.$root.interlink(host.type,$soul(host),type,$soul(it))
       }

    },

    reset(status) {
      console.log(status)
      this.$emit('added')
      this.$forceUpdate();
      this.search=null;
      this.item={...blankItem};
    }
  },
}
