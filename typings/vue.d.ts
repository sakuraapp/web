import { Store } from 'vuex'
import { PermissionName } from '~/helpers/permission'
import { RootState } from '~/store/types'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<RootState>
        hasPermission: (name: PermissionName) => boolean
    }
}
