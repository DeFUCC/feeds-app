import cardContent from './card-content.js'
import systemBar from './system-bar.js'
import addForm from './add-form.js'

import {stressedWord} from '../../help.js'
import gun from '../../gundb.js'

export default {
  name:'card',
  props: {
    item:Object,
    selected:Boolean,
  },
  components:{
    cardContent,
    systemBar,
    addForm
  },
  data() {
    return {
      open: {
        meanings: false,
        author: false,
        authorDetails: false,
        addNew: false,
        edit:false,
        words:false,
        info:false,
      },
    }
  },
  template:`
        <v-card :id="$soul(item)"  :raised="selected" :outlined="!selected">

          <system-bar  v-if="$bus.loggedIn" v-show="$bus.edit" v-model="open"  :item="item"></system-bar>

          <v-card-title style="padding:0.5em 1em;">
            <v-row>
              <v-col  @click="$bus.$emit('select',item)">

                <h3 class="title font-weight-regular"  v-if="item.title">
                  {{item.title}}</h3>
                <p class="body-1 font-weight-regular" v-if="item.description">{{item.description}}</p>
              </v-col>
            </v-row>
          </v-card-title>
          <v-expand-transition>
            <v-card-text style="padding-top:0" v-if="selected">
                <add-form @added="open.addNew=false"></add-form>
            </v-card-text>
          </v-expand-transition>
          <card-content v-if="item.meanings || item.words"  v-show="open.info || selected" :item="item"></card-content>

        </v-card>

  `,
  computed: {
    stressedWord() {
      return stressedWord(this.item)
    },
    ucText() {
      if (!this.item.text) return this.item.text;
      return this.item.text[0].toUpperCase() + this.item.text.slice(1);
    }
  },
  methods: {
    ucFirst(str) {

    }
  }
}
