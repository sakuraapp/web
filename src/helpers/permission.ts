import { Permissions, Role } from '@sakuraapp/common'

export type PermissionName = keyof typeof Permissions
export type RoleName = keyof typeof Role

export function getPermission(name: PermissionName): Permissions {
    return Permissions[name]
}

export function getRole(name: RoleName): Role {
    return Role[name]
}
