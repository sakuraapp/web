import { createApp } from 'vue'
import VueAxios from 'vue-axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from '~/components/App.vue'

import store from './store'
import router from './router'
import axios from 'helpers/axios'

import './index.css'

library.add(fas)

createApp(App)
    .use(VueAxios, axios)
    .use(store)
    .use(router)
    .component('FontAwesomeIcon', FontAwesomeIcon)
    .directive('visible', (el, binding) => {
        el.style.visibility = binding.value ? 'visible' : 'hidden'
    })
    .mount('#app')
