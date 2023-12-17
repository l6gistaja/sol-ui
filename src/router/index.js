
import LoginView from '../views/LoginView.vue'
import PlantsView from '../views/PlantsView.vue'
import PlantView from '../views/PlantView.vue'
import SandboxView from '../views/SandboxView.vue'
import StatsView from '../views/StatsView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthenticator } from "@aws-amplify/ui-vue"

const auth = useAuthenticator()

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/plants',
      name: 'plants',
      component: PlantsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/plants/:id',
      name: 'plant',
      component: PlantView,
      meta: { requiresAuth: true }
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: SandboxView,
      meta: { requiresAuth: true }
    },
    {
      path: '/statistics',
      name: 'stats',
      component: StatsView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  //console.log('Route to: ' + to.name + '; Auth status: ' + auth.route)
  if(auth.route !== 'authenticated' && to.name !== 'login') { 
    //auth.signOut()
    //console.log('Route2 to: ' + to.name + '; Auth status: ' + auth.route)
    next({name:'login'}) 
  }
  next()
});



export default router
