import gun from '../gundb.js'

export default {
  props: {
    type:String,
    base:Boolean,
  },
  data() {
    return{
      word:{
        letters:'',
        stress:0,
        type:'words',
        banned:false,
      },
      stressSymbol:'\u0301',
      wordMeans:[],
      meaning:{
        text:'',
        type:'meanings',
        banned:false,
      },
      valid:{
        word:false,
        meaning:false,
      },
      rules: {
        word: [
          /* UNCOMMENT AFTER DB SETUP
            v => /^[А-Яа-яёЁ]*$/.test(v) || 'Только русские буквы',
            v => (v || '').indexOf(' ') < 0 || 'Только одно слово, без пробелов',
            v => (v || '').length<21 || 'Слишком длинное слово',
            v => (v || '').length>1 || 'Нужно хотя бы две буквы'
            */
        ],
        meaning: [
          /*
          v => (v && v.length < 140) || 'Слишком длинное определение',
          v => (v && v.length > 7) || 'Слишком короткое определение'
          */
        ],
      },
    }
  },
  template:`
    <v-container style="padding-top:0">

      <v-form ref="wordForm" v-if="type=='words'" v-model="valid.word">

        <v-row v-if="!base">
          <v-col style="padding-top:0">

                  <v-text-field
                    append-icon="mdi-close"
                    large outlined single-line
                    maxlength="21"
                    v-model="word.letters"
                    :rules="rules"
                    label="Новое слово"  counter
                    hint="Найдите или предложите своё"></v-text-field>

              </v-col>
            </v-row>
            <v-row v-if="letters">
              <v-col cols="10">
                <v-btn-toggle v-model="word.stress">

                  <v-btn min-width="1em" max-width="1em"  v-for="(letter,index) in letters" :key="index">{{letter}}{{word.stress==index ? stressSymbol : ''}}</v-btn>

                </v-btn-toggle>

              </v-col>

              <v-col cols="2">

            <v-btn min-width="1em" max-width="1em" :disabled="!valid.word"  @click="createWord()"><v-icon>mdi-plus</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-form v-if="type=='meanings'" ref="meaningForm" v-model="valid.meaning">
        <v-row >

          <v-col style="padding-top:0" cols="12">
            <v-textarea :rules="rules.meaning" rows="2" v-model="meaning.text" label="Значение"></v-textarea>
          </v-col>
          <v-col>
            <v-btn :disabled="!valid.meaning" v-if="type=='meanings'&&valid.meaning" @click="createMeaning()">Добавить значение</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  `,
  computed: {
    wordLength() {
      if (this.word&&this.word.letters) {
        return this.word.letters.length
      } else {
        return 0
      }
    },
    letters() {
      if (this.base) {
        return this.$bus.search
      } else {
        return this.word.letters
      }
    }
  },
  methods: {
    createWord() {
      if(this.base) {
        this.word.letters = this.$bus.search
      }
      let word = gun.get('words').set(this.word, () => {
        if(this.base) {this.$bus.$emit('search-reset')}
      })
      if (this.$bus.selected && this.$bus.selected.type=='meanings') {
        let meaning = gun.get('meanings')
                         .get(this.$soul(this.$bus.selected));
        meaning.get('words').set(word)
        word.get('meanings').set(meaning)
        this.$emit('added',word)
        this.$bus.$emit('search-reset')
        this.$refs.wordForm.reset();
      }
    },
    createMeaning() {
      let meaning = gun.get('meanings').set(this.meaning)
      let word = {}
      if (this.$bus.selected) {
        word = gun.get('words').get(this.$soul(this.$bus.selected));
        meaning.get('words').set(word)
        word.get('meanings').set(meaning)
        this.$emit('added',word)
        this.$bus.$emit('search-reset')
        this.$refs.meaningForm.reset();
      }

    },
  },
}
