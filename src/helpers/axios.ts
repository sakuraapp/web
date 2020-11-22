import Axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import AccountService from 'account/account'
import store from '../store'

const adapter =
    process.env.NODE_ENV !== 'development'
        ? cacheAdapterEnhancer(Axios.defaults.adapter)
        : null
const axios = Axios.create({
    baseURL: process.env.API_URL,
    headers: { 'Cache-Control': 'no-cache' },
    adapter,
})

axios.interceptors.request.use((config) => {
    const token = store.state.token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers['X-Socket-Id'] = store.state.socketId
    }

    return config
})

axios.interceptors.response.use(
    (res) => res,
    (err) => {
        const res = err.response

        if (res && res.status === 401) {
            // Automatically log user out if a request returns unauthorized

            AccountService.logout()
            AccountService.openLogin()
        }

        return Promise.reject(err)
    }
)

export default axios
