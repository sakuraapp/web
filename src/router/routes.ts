import { RouteConfig } from 'vue-router'

type VueImport = Promise<typeof import('*.vue')>

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: (): VueImport => import('~/pages/home.vue'),
        meta: { isRootView: true },
    },
    {
        path: '/app',
        name: 'app',
        component: (): VueImport => import('~/pages/app.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/room/:id',
        name: 'room',
        component: (): VueImport => import('~/pages/room.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/auth/login',
        component: (): VueImport => import('~/pages/auth.vue'),
    },
]

export default routes
