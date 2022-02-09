import {
    Opcode,
    Permissions,
    Role,
    RoomInfo,
    UserInfo,
    UserId,
} from '@sakuraapp/common'

export type User = UserInfo
export type Room = RoomInfo

export interface RoomMember {
    user: UserId
    roles: Role[]
}

export interface RoomMemberInfo extends Omit<RoomMember, 'user'> {
    user: User
}

export interface Packet<T = unknown> {
    op: Opcode
    d: T
    t?: number
}

export interface JoinRoomData {
    room: Room
    members: RoomMemberInfo[]
    permissions: Permissions
    roles: Role[]
    queue: MediaItem[]
}

export interface RoomUpdateData {
    name: string
    private: boolean
}

export interface RoleUpdateData {
    userId: UserId
    roleId: Role
}

export type TrackId = string | number

export interface Track {
    readonly id: TrackId
    readonly label: string
}

export interface Message {
    id?: string
    author: UserId
    content: string
}

export interface MessageGroupMember {
    id?: string
    content: string
}

export interface MessageGroup {
    author: UserId
    messages: MessageGroupMember[]
    messageIds: string[]
}

export interface MessageGroupInfo {
    author: User
    messages: MessageGroupMember[]
}

export interface MediaItem {
    id: string
    url: string
    title: string
    icon: string
    author: UserId
}

export interface MediaItemInfo extends Omit<MediaItem, 'author'> {
    author: User
}

export enum RoomStatus {
    None,
    Joining,
    Joined,
}

export enum NotificationType {
    RoomJoinRequest = 0,
}

export interface Notification<T> {
    id: string
    type: NotificationType
    data: T
}
