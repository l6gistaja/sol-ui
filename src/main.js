import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
import i18n from "./i18n"
import AmplifyVue from '@aws-amplify/ui-vue'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(AmplifyVue)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.min.js'
