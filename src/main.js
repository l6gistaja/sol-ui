import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AmplifyVue from '@aws-amplify/ui-vue'

const app = createApp(App)
app.use(router)
app.use(AmplifyVue)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.min.js'
