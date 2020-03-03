import cardContent from './card-content.js'
import systemBar from './system-bar.js'
import addForm from './add-form.js'

import {stressedWord} from '../help.js'
import gun from '../gundb.js'

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
        <v-card :id="$soul(item)" color="white"  :raised="selected" :outlined="!selected">

          <system-bar  v-if="$bus.loggedIn" v-show="$bus.edit" v-model="open"  :item="item"></system-bar>

          <v-card-title style="padding:0.5em 1em;">
            <v-row>
              <v-col cols="10" @click="$bus.$emit('select',item)">

                <h3 class="the-word" v-if="item.type=='words'">
                  {{stressedWord}}</h3>
                <p class="the-word" v-if="item.type=='meanings'">{{ucText}}</p>
              </v-col>
              <v-col cols="2" class="text-right">
                <v-btn color="grey" v-if="!selected && (item.meanings || item.words)"  @click="open.info=!open.info"  icon>
                  <v-icon :class="{'turn180':open.info}" :color="item.banned ? 'red':'grey'">mdi-chevron-down</v-icon>

                </v-btn>
                <v-btn color="grey" v-if="this.$bus.selected == item" @click="open.addNew=!open.addNew;"  icon>
                  <v-icon :class="{'turn45':open.addNew}" >mdi-plus</v-icon>

                </v-btn>

              </v-col>
            </v-row>
          </v-card-title>

          <v-expand-transition>
            <v-card-text style="padding-top:0" v-if="open.addNew && this.$bus.selected==item">
                <add-form @added="open.addNew=false" :type="$bus.types[item.type].link"></add-form>
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
