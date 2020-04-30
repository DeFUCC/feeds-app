export default {
  props: [],
  data() {
    return {
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
    <div class="my-2" style="position:relative">

      <h3 class="mb-3 font-weight-regular">{{$t("shortDesc")}}</h3>



    </div>
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
