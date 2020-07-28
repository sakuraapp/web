import { AxiosInstance } from 'axios'

declare module 'vue/types/vue' {
    interface VueConstructor {
        $axios: AxiosInstance
    }
}
