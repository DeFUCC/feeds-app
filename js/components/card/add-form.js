import { addItem, updateItem } from '../../gun-db.js'

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
    edit:{
      type: Object,
    },
    host: Object,
    type:{
      type: String,
      default:'project',
    },
  },
  data() {
    return{
      valid:false,
      item: {...blankItem},
      search:null,
      author:false,
      encrypt:false,
    }
  },
  created() {
    if (this.edit) {
      this.item={...this.edit};
    } else {
      this.item.type=this.type;
    }
  },
  template:`
    <v-container class="py-0" style="background-color:#eee">
      <v-form ref="form" v-model="valid">
        <v-row>

          <v-col
            cols="12"
            :key="field.type"
            v-for="field in linkType.fields">

            <v-text-field
              @input="searchIt"
              outlined
              hide-details
              v-if="field.type=='text'"
              v-model="item[field.name]"
              :label="field.label"></v-text-field>

            <v-textarea
              @input="searchIt"
              outlined
              hide-details
              v-if="field.type=='textarea'"
              rows="2"
              v-model="item[field.name]"
              :label="field.label"></v-textarea>

          </v-col>
        </v-row>
        <v-row>

          <v-switch
            class="mt-0"
            v-if="$store.loggedIn"
            v-model="author"
            prepend-icon="mdi-account-lock-outline"
          ></v-switch>

          <v-switch
            class="mt-0"
            v-if="false && $store.loggedIn && author"
            v-model="encrypt"
            prepend-icon="mdi-lock"
          ></v-switch>

          <v-btn icon
            v-if="edit"
            :disabled="!item.title && !item.description" @click="updateItem()">
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>

          <v-btn
            v-if="!edit"
            :disabled="!item.title && !item.description" @click="createItem()">
            {{$t('add')}}
          </v-btn>

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
    searchIt(val) {
      this.$emit('search',val)
    },
    validate(item) {
      let emoji_regex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;

      const emo_test = str => emoji_regex.test(str);

      if(item.type=="icon") {
        return emo_test(item.title)
      }

      return true

    },
    async updateItem() {
      let it = {...this.item}

      if (!this.validate(it)) {
        this.$root.$emit('notify', 'Не правильно заполнены поля')
        return
      }

      await updateItem(it, (msg) => {
        this.$root.$emit('notify', msg)
        if(!msg.lack) {
          this.$emit('edited',it)
        }
      })

    },
    async createItem() {
      let {host, item, type, author} = this;
      await addItem({ item, type, author, host })
      this.reset();
    },

    reset(status) {
      this.$emit('added')
      this.$forceUpdate();
      this.search=null;
      this.item={...blankItem};
    }
  },
}
