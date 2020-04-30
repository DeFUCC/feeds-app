import feeds from './components/feeds.js'
import graphs from './components/graphs.js'


const routes = [
  {path:'', component: feeds},
  {path:'/graph', component: graphs},
]

export default new VueRouter({
  routes
})
