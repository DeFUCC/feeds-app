import d3 from '../assets/d3.js'
import d3Network from '../assets/vue-d3-network.umd.js'
import {types} from '../schema/types.js'


export default {
  components: {
    d3Network
  },
  data() {
    return {
      title:'Graph visualization',
      types,
      nodes:[],
      links:[],
      loaded:false,
      options: {
        nodeSize:12,
        nodeLabels:true,
        linkWidth:2,
      },
      colors: {
        design:'#111',
        project:'#aaa',
        object:'#a0a',
        event:'#00a',
        user:'#0ff',
      }
    }
  },
  template: `
  <v-sheet id="graph" style="width:100vw; height:100vh; overflow-y:scroll">

     <d3-network ref='net' :net-nodes="nodes" :net-links="links" :options="options" />

  </v-sheet>
  `,
  created() {
    let {$gun, $gunroot, types} = this
    for (let type in types) {
      $gun.get(type).map().once((data,key) => {

        if(data && typeof data == 'object' && (data.title || data.description)) {
          this.nodes.push({
            name: (data.title||data.description).slice(0,12),
            id: key,
            type: data.type,
            data:data,
            _color:this.colors[data.type],
            _cssClass:'graph-node',
          })
        }
      })
    }
  },
  watch: {
    nodes() {
      if(this.loaded) {
        this.getLinks()
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.loaded=true
      this.getLinks()
    }, 3000);
  },
  computed: {

  },
  methods: {
    getLinks() {
      this.links=[];
      for (let node of this.nodes) {
        for (let type in types) {
          if (node.data[type]) {
            this.$gunroot.get(node.id).get(type).map().once((data,key) => {
              if(data && this.nodes.find(n => n.id==key)) {
                this.links.push({
                  sid:node.id,
                  tid:key,
                })
              }
            })
          }
        }
      }
    }
  },

};
