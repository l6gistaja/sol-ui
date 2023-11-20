import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import StatsView from '../views/StatsView.vue';
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
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
      meta: { requiresAuth: false }
    }
  ]
})

/*
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authCredentials');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    localStorage.setItem('intendedRoute', to.fullPath);
    console.log("Save itendedRoute: " + to.fullPath)
    next({name:'login'});
  } else {
    next();
  }
});
*/

export default router
