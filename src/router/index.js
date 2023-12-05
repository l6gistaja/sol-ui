
import DeviceView from '../views/DeviceView.vue';
import DevicesView from '../views/DevicesView.vue';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import StatsView from '../views/StatsView.vue';
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthenticator } from "@aws-amplify/ui-vue";

const auth = useAuthenticator();

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/device',
      name: 'device',
      component: DeviceView,
      meta: { requiresAuth: true }
    },
    {
      path: '/devices',
      name: 'devices',
      component: DevicesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
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
  console.log('Route to: ' + to.name + '; Auth status: ' + auth.route)
  if(auth.route !== 'authenticated' && to.name !== 'login') { next({name:'login'}) }
  next()
});



export default router
