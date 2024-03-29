import Axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import { AccountService } from '~/account/account'
import store from '../store'
import { getEnv, isDevelopment } from './util'

const adapter = !isDevelopment()
    ? cacheAdapterEnhancer(Axios.defaults.adapter)
    : null

const axios = Axios.create({
    baseURL: getEnv('API_URL'),
    headers: { 'Cache-Control': 'no-cache' },
    adapter,
})

axios.interceptors.request.use((config) => {
    const token = store.state.session.token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers['X-Session-Id'] = store.state.session.id
    }

    return config
})

axios.interceptors.response.use(
    (res) => res,
    (err) => {
        const res = err.response

        if (res && res.status === 401) {
            // Automatically log user out if a request returns unauthorized

            AccountService.setToken()
            AccountService.openLogin()
        }

        return Promise.reject(err)
    }
)

export default axios
