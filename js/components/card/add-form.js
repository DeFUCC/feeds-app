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
    hostid: String,
    hosttype:String,
    type:{
      type: String,
      default:'idea',
    },
    base: Boolean,
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
      {{hostid}} !!! {{hosttype}} === {{type}} +++ {{item}}
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col cols="12" v-for="field in linkType.fields">
            <v-text-field v-if="field.input=='text'"
              v-model="item.title"
              label="Название"></v-text-field>
            <v-textarea v-if="field.input=='textarea'"  rows="2" v-model="item.description" label="Описание"></v-textarea>
          </v-col>
          <v-col>
            <v-btn :disabled="!item.title && !item.description" @click="createItem()">Добавить</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  `,
  computed: {
    hostType() {

    },
    linkType() {
      let type = this.type;
       return this.$bus.types[type]
    }
  },
  methods: {
    async createItem() {
      let {hostid,hosttype,item,type} = this;


      item.createdAt = this.$state();

      if (this.$user.is) {
        item.createdBy = this.$user.is.pub;
        item = await this.$user.get(type).set(item)
        console.log(item)
      }

       item = await this.$gun.get(type).set(item);
       console.log(item)
       let itemid = this.$soul(item);
       console.log(hostid,hosttype,itemid,type)

       if (hostid) {
         let host =  this.$gun.get(hosttype).get(hostid);
         let theitem = this.$gun.get(type).get(itemid);
         let hosted = await host.get(type).set(theitem);
         let linked = await theitem.get(hosttype).set(host)
       }
       this.reset(item);
       return item
    },
    reset(status) {
      console.log(status)
      this.$emit('notify',status)
      this.item=blankItem;
    }
  },
}
