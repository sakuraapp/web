import { createApp } from 'vue'
import VueAxios from 'vue-axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from '~/App.vue'

import store from './store'
import router from './router'
import axios from 'helpers/axios'

import PermissionMixin from './mixins/permission'

import './index.css'

library.add(fas, far)

createApp(App)
    .use(VueAxios, axios)
    .use(store)
    .use(router)
    .mixin(PermissionMixin)
    .component('FontAwesomeIcon', FontAwesomeIcon)
    .directive('visible', (el, binding) => {
        el.style.visibility = binding.value ? 'visible' : 'hidden'
    })
    .mount('#app')
