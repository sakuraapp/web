import store from '~/store'
import { Permissions } from '@sakuraapp/common'

export function getPermission(name: string): number {
    const keys = Object.keys(Permissions)

    for (const i in keys) {
        if (keys[i] === name) {
            return Object.values(Permissions)[i]
        }
    }

    return null
}

export function hasPermission(name: string): boolean {
    const { state } = store
    const permission = getPermission(name)

    return (
        state.user.id === state.room.owner ||
        state.room.permissions.includes(permission)
    )
}
