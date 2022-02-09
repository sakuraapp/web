import { defineComponent } from 'vue'
import { getPermission, PermissionName } from '~/helpers/permission'

export default defineComponent({
    methods: {
        hasPermission(name: PermissionName): boolean {
            const { state } = this.$store
            const permission = getPermission(name)
            const userId = state.session.userId

            return (
                userId === state.room.info.owner.id ||
                Boolean(state.room.permissions & permission)
            )
        },
    },
})
