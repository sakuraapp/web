import { createRouter, createWebHistory } from 'vue-router'
import { AccountService } from '~/account/account'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (AccountService.isLoggedIn()) {
            next()
        } else {
            AccountService.openLogin()
        }
    } else if (to.matched.some((record) => record.meta.requiresUnauth)) {
        if (AccountService.isLoggedIn()) {
            next('/app')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
