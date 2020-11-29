import axios from 'helpers/axios'
import store from '~/store'

export interface User {
    id: string
    username: string
    discriminator: string
    avatar?: string
}

export default class AccountService {
    static loginUrl = `${process.env.API_URL}/auth/login`

    static openLogin(): void {
        window.location.href = this.loginUrl
    }

    static async verifyLogin(): Promise<boolean> {
        const res = await axios.get('/auth/verify')

        console.log(res)

        return false
    }

    static async isLoggedIn(): Promise<boolean> {
        const token = await this.fetchToken()

        if (token) {
            if (!store.state.user) await this.fetchUserData()

            return true
        } else {
            return false
        }
    }

    static logout(): void {
        return store.commit('handleToken', { token: null, save: true })
    }

    static async fetchToken(): Promise<string> {
        const token: string = await store.dispatch('getToken')

        store.commit('handleToken', { token })

        return token
    }

    static async fetchUserData(): Promise<User> {
        const res = await axios.get('/users/me')
        const user: User = res.data

        store.commit('handleMyUser', user)

        return user
    }
}
