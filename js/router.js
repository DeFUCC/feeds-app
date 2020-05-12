import feeds from './routes/feeds.js'
import graphs from './routes/graphs.js'


const routes = [
  {path:'', component: feeds},
  {path:'/graph', component: graphs},
]

export default new VueRouter({
  routes
})
