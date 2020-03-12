import types from '../../types.js'

export default {
  props: [],
  data() {
    return{
      types:types,
      peers:this.$gun.back('opt.peers'),
    }
  },
  mounted() {

  },
  template:`
    <v-container>
      <h1 class="font-weight-regular">ЛЕНТЫ</h1>
      <h3 class="mb-3 font-weight-regular">Средство и среда совместной разработки и реализации социо-культурных программ</h3>

      <p>
        Программа представляет собой сеть взаимосвязанных утверждений и обсуждений, формирующих общественное понимания
      </p>

      <v-car v-if="false" v-for="type in types">
        {{type.title}}
        <v-card dark v-if="type.canHave" v-for="subType in type.canHave">
          {{subType.title}}
        </v-card>
      </v-card>

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
