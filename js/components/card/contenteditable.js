// <contenteditable :value.sync="item.text"></contenteditable>

// https://stackoverflow.com/questions/53899676/vue-2-contenteditable-with-v-model

export default {
  template: `<p
    contenteditable="true"
    @input="update"
    @focus="focus"
    @blur="blur"
    v-html="valueText"
    @keyup.enter="$emit('submit')"
    @keyup.ctrl.delete="$emit('delete-row')"
  ></p>`,
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      focusIn: false,
      valueText: ''
    }
  },
  computed: {
    localValue: {
      get: function() {
        return this.value
      },
      set: function(newValue) {
        this.$emit('update:value', newValue)
      }
    }
  },
  watch: {
    localValue(newVal) {
      if (!this.focusIn) {
        this.valueText = newVal
      }
    }
  },
  created() {
    this.valueText = this.value
  },
  methods: {
    update(e) {
      this.localValue = e.target.innerHTML
    },
    focus() {
      this.focusIn = true
    },
    blur() {
      this.focusIn = false
    }
  }
}
