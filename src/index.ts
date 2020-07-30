import Vue, { VNode } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from '~/components/App.vue'

import store from './store'
import router from './router'
import axios from 'helpers/axios'

import './index.css'

library.add(fas)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.prototype.$axios = axios

new Vue({
    store,
    router,
    el: '#app-container',
    render: (h): VNode => h(App),
})
