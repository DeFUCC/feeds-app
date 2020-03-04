const blankItem = {
    title:'',
    description:'',
    createdAt:undefined,
    createdBy:undefined,
  }

export default {
  props: {
    type:{
      type:String,
      default:'idea',
    },
    base:Boolean,
  },
  data() {
    return{
      valid:false,
      item: {...blankItem},
    }
  },
  template:`
    <v-container style="padding-top:0">
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="item.title"
              label="Название"></v-text-field>
            <v-textarea  rows="2" v-model="item.description" label="Описание"></v-textarea>
          </v-col>
          {{item}}
          <v-col>
            <v-btn @click="createItem()">Добавить</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  `,
  computed: {

  },
  methods: {
    createItem() {
      this.item.createdAt = this.$state();
      if (this.$user.is) {
        this.item.createdBy = this.$user.is.pub;
      }
      let item = this.$gun.get(this.type).set(this.item, this.reset)
    },
    reset(status) {
      this.$emit('notify',status)
      this.item=blankItem;
    }
  },
}
