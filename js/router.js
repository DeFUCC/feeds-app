import feedsApp from './components/feeds-app.js'
import gameApp from './components/game/game-app.js'
import graphApp from './components/graph/graph-app.js'


const routes = [
  {path:'', component: feedsApp},
  {path:'/game', component: gameApp},
  {path:'/graph', component: graphApp},
]

export default new VueRouter({
  routes
})
