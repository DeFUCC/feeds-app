import feeds from './routes/feeds.js'
import graphs from './routes/graphs.js'
import designs from './routes/designs.js'


const routes = [
  {path:'', component: feeds},
  {path:'/designs', component: designs},
  {path:'/graph', component: graphs},
]

export default new VueRouter({
  routes
})
