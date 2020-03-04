import cardActions from './card-actions.js'
import addForm from './add-form.js'
import editable from './editable.js'

export default {
  name:'card',
  props: {
    item:Object,
    selected:Boolean,
  },
  components:{
    cardActions,
    addForm,
    editable,
  },
  data() {
    return {
      open: {
        add:false,
      },
      edit: {
        title:false,
        description:false,
      },
      creator:null,
    }
  },
  created() {
    this.$gun.user(this.item.createdBy).once((user) =>{
      this.creator = user.alias
    })
  },
  template:`
        <v-card
          :id="$soul(item)"
          :raised="selected"
          :outlined="!selected">

            <v-card-title

              v-if="item.description"
              @click="$bus.$emit('select',item)">
                  <editable
                    class="pointer title font-weight-regular"
                    :item="item"
                    property="title"
                    :selected="selected"
                    ></editable>
            </v-card-title>

            <v-card-text
              v-if="item.description">
                <editable
                  class="body-1 font-weight-regular"
                  :item="item"
                  property="description"
                  :selected="selected"
                  ></editable>
            </v-card-text>

            <v-expand-transition>
              <v-card-text
                style="padding-top:0" v-if="open.add">
                  <add-form @added="open.add=false"></add-form>
              </v-card-text>
            </v-expand-transition>
            
            <v-card-actions v-if="selected" style="background-color:#f9f9f9" class="overline">
              Автор: {{creator}}<br>
              Создано {{$moment(item.createdAt).fromNow()}}<br>
            Отредактировано  {{$moment(item.editedAt).fromNow()}}
          </v-card-actions>

            <card-actions
              :open="open"
              @add="open.add=!open.add"
              v-show="$bus.loggedIn && selected"
              :item="item"></card-actions>

        </v-card>
  `,
  computed: {

  },
  methods: {

  }
}
