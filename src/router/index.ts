import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import AccountService from '~/account/account'
import store from '~/store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
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
