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
      console.log(this.type)
      let linkType = this.$root.types[this.type]
       return linkType;
    }
  },
  methods: {
    async createItem() {
      let {host, item, type, $gun, $soul, $user} = this;
      let it = {...item}
      it.createdAt = this.$state();
      if ($user.is) {
        it.createdBy = $user.is.pub;
        it = await $user.get(type).set(it)
      }

       it = await $gun.get(type).set(it);

       if (host) {
        it = await this.$root.interlink(host.type,$soul(host),type,$soul(it))
       }
       this.reset(it);
    },

    reset(status) {
      console.log(status)
      this.$emit('added')
      this.$forceUpdate();
      this.item={...blankItem};
      this.$root.selected=''
    }
  },
}
