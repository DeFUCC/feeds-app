import {interlink} from './gun-db.js'

const store = new Vue({
  data: {
    loggedIn:false,
    auth:false,
    search:'',
    toLink:null,
    selected:null,
    seen:{},
    show:{
      banned:false,
      bottom:true,
      user:false,
      nav:false,
      seen:false,
    },
  },
  methods: {
    select(item) {
      if (item == this.selected || !item) {
        this.selected=null;
      } else {
        this.selected = item;
      }
    },
    async toLinkTo(itemType,item) {
      await interlink(
        this.toLink.type,
        this.$soul(toLink),
        itemType,
        item
      );
      this.toLink=null;
    },
    async see(item) {
      let {$user, $gunroot, $soul, seen, $gun} = this;
        let key = $soul(item);
        if (!seen[key]) {
          let it = $gunroot.get(key);
          let its = await $user.get('feeds').get('seen').set(it)
          let pubit = await $gun.get('seen').get(key).get($user.is.pub).put('seen')
        } else {
          await $user.get('feeds').get('seen').get(key).put(null);
          $gun.get('seen').get(key).get($user.is.pub).put(null)
          delete seen[key];
        }
    },
  }
})

Vue.prototype.$store = store;

export default store
