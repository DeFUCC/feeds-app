export default {
  props: {
  },
  data() {
    return{
      valid:false,
      search:'',
      rules: [
            v => /^[А-Яа-яёЁ]*$/.test(v) || 'Только русские буквы',
            v => (v || '').indexOf(' ') < 0 || 'Только одно слово, без пробелов',
            v => (v || '').length<21 || 'Слишком длинное слово',
            v => (v || '').length>0 || 'Нужна хотя бы одна буква'
        ],
    }
  },
  template:`
  <v-expand-transition>
    <v-form ref="form" v-model="valid" class="main-search">
          <v-text-field

            color="#fff"
            append-icon="mdi-close"
            large outlined single-line
            maxlength="21"
            @blur="!search ? reset():''"
            @click:append="reset()"
            v-model="search"
            :rules="rules"
            label="Новое слово"  counter
            hint="Найдите или предложите своё"></v-text-field>
    </v-form>
  </v-expand-transition>
  `,
  watch: {
    search(letters) {
      if(this.$refs.form.validate()) {
        this.$bus.search=letters.toLowerCase();
      } else {
        this.$bus.search=''
      }
    }
  },
  mounted() {
    this.$bus.$on('search-reset', this.reset)
  },
  methods: {
    reset() {
      this.$refs.form.reset()
      this.$bus.search='';
      this.$refs.form.resetValidation()
    }
  },
  beforeDestroy() {
    this.$bus.$off('search-reset', this.reset)
  },
}
