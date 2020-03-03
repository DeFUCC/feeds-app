import gun from '../gundb.js'

export default {
  props: [],
  data() {
    return{
      gun:gun,
      peers:gun.back('opt.peers'),
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

    <p>При поддержке <a href="https://frkt.ru" target="_blank">Фонда ФРУКТ</a></p>

    </v-container>
  `,
  methods: {

  },

}
