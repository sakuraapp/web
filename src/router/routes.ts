import { RouteConfig } from 'vue-router'

type VueImport = Promise<typeof import('*.vue')>

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'main',
        component: (): VueImport => import('~/pages/main.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/auth/login',
        component: (): VueImport => import('~/pages/auth.vue'),
    },
]

export default routes
