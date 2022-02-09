import cookies from 'browser-cookies'
import axios from '~/helpers/axios'
import { getEnv } from '~/helpers/util'
import router from '~/router'
import { User } from '~/types'

const env = import.meta.env.MODE

export class AccountService {
    static isLoggedIn(): boolean {
        return Boolean(this.getToken())
    }

    static getLoginUrl(provider: string): string {
        return `${getEnv('API_URL')}/auth/${provider}`
    }

    static getToken(): string {
        return cookies.get('token') || ''
    }

    static setToken(token?: string): void {
        if (token) {
            cookies.set('token', token, {
                expires: 365,
                secure: env !== 'development',
                domain: getEnv('COOKIE_DOMAIN'),
            })
        } else {
            cookies.erase('token')
        }
    }

    static openLogin(provider?: string): void {
        if (provider) {
            window.location.href = this.getLoginUrl(provider)
        } else {
            router.push({ name: 'login' })
        }
    }

    static logout(): void {
        this.setToken()
    }

    static async fetchUserData(): Promise<User> {
        const res = await axios.get('/users/@me')
        const user: User = res.data.user

        return user
    }
}
