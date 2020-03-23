import feedsApp from './components/feeds-app.js'
import gameApp from './components/game/game-app.js'


const routes = [
  {path:'', component: feedsApp},
  {path:'/game', component: gameApp}
]

export default new VueRouter({
  routes
})
