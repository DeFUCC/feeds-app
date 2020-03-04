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
  <v-fade-transition>
    <v-form transition="scroll-x-transition" ref="form" v-model="valid" class="main-search">
          <v-text-field

            append-icon="mdi-close"
            outlined single-line
            @blur="!search ? reset():''"
            @click:append="reset()"
            v-model="search"
            label="Поиск"></v-text-field>
    </v-form>
  </v-fade-transition>
  `,
  watch: {
    search(letters) {
      if(letters && this.$refs.form.validate()) {
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
      this.$emit('reset');
      this.$refs.form.reset()
      this.$bus.search='';
      this.$refs.form.resetValidation()
    }
  },
  beforeDestroy() {
    this.$bus.$off('search-reset', this.reset)
  },
}
