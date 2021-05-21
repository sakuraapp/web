import { defineAsyncComponent } from '@vue/runtime-core'
import { RouteRecordRaw } from 'vue-router'

type VueImport = Promise<typeof import('*.vue')>
const pages = import.meta.glob('/pages/*.vue')

function load(path: string) {
    return pages[path]
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: pages['/pages/home.vue'],
        meta: { isRootView: true },
    },
    {
        path: '/app',
        name: 'app',
        component: pages['/pages/app.vue'],
        meta: { requiresAuth: true },
    },
    {
        path: '/room/:id',
        name: 'room',
        component: pages['/pages/room.vue'],
        meta: { requiresAuth: true },
    },
    {
        path: '/auth/login/:providerId',
        component: pages['/pages/auth.vue'],
    },
]

export default routes
