import {types} from '../../types.js'

export default {
  props: [],
  data() {
    return{
      types:types,
      peers:this.$gun.back('opt.peers'),
    }
  },
  watch: {
    user() {

    }
  },
  mounted() {

  },
  template:`
    <v-container>

      <h3 class="mb-3 font-weight-regular">Настольная игра в придумывание новых слов и их значений</h3>

      <p>
      Это веселая и увлекательная игра для любой компании. Она была изобретена в конце 2018 года как шутливый ответ на проблему переопределённости слов в русском языке. В ней каждый может стать автором новых слов и их определений. Это возможность каждому участнику проявить себя, получше узнать окружающих и вместе, смеясь, обнаруживать новые смыслы и их обозначения.
      </p>


    <p>При поддержке <a href="https://frkt.ru" target="_blank">Фонда ФРУКТ</a></p>

    </v-container>
  `,
  methods: {
    decycle(obj, stack = []) {
        if (!obj || typeof obj !== 'object')
            return obj;

        if (stack.includes(obj))
            return null;

        let s = stack.concat([obj]);

        return Array.isArray(obj)
            ? obj.map(x => this.decycle(x, s))
            : Object.fromEntries(
                Object.entries(obj)
                    .map(([k, v]) => [k, this.decycle(v, s)]));
    }
  },

}
