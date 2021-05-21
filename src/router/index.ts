import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import AccountService from '~/account/account'
import store from '~/store'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.state.ws) {
            return next()
        }

        AccountService.isLoggedIn().then((loggedIn) => {
            if (loggedIn) {
                store.commit('setupWindow')
                store.commit('setupWebSocket')

                next()
            } else {
                AccountService.logout()
                AccountService.openLogin()
            }
        })
    } else {
        next()
    }
})

export default router
