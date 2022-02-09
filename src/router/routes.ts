import { RouteRecordRaw } from 'vue-router'
import { Store } from 'vuex'
import { RootState } from '~/store/types'

type VueImport = Promise<typeof import('*.vue')>
const pages = import.meta.glob('/pages/**/*.vue')

console.log(pages)

const authRequiredMeta = { requiresAuth: true }
const unAuthRequiredMeta = { requiresUnauth: true } // unauthenticated requests only

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: pages['/pages/home.vue'],
    },
    {
        path: '/login',
        name: 'login',
        meta: unAuthRequiredMeta,
        component: pages['/pages/login.vue'],
    },
    {
        path: '/auth/:providerId/callback',
        meta: unAuthRequiredMeta,
        component: pages['/pages/auth/index.vue'],
    },
    {
        path: '/auth/complete',
        name: 'completeAuth',
        meta: unAuthRequiredMeta,
        component: pages['/pages/auth/complete.vue'],
        props: true,
    },
    {
        path: '/logout',
        name: 'logout',
        meta: authRequiredMeta,
        component: pages['/pages/logout.vue'],
    },
    {
        path: '/app',
        component: pages['/pages/app.vue'],
        meta: authRequiredMeta,
        children: [
            {
                path: '',
                name: 'app',
                component: pages['/pages/app/index.vue'],
            },
            {
                path: '/room/:id',
                name: 'room',
                component: pages['/pages/app/room.vue'],
                meta: {
                    overlay: (store: Store<RootState>): boolean => {
                        return Boolean(store.state.room.info)
                    },
                },
            },
        ],
    },
]

export default routes
