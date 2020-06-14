import feeds from './routes/feeds.js'
import graphs from './routes/graphs.js'
import designs from './routes/designs.js'
import design from './components/design.js'


const routes = [
  {path:'', component: feeds},
  {path:'/designs', component: designs},
  {path:'/graph', component: graphs},
  {path:'/design/:id', component: design},
]

export default new VueRouter({
  routes
})
