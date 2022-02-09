import { Permissions, UserId } from '@sakuraapp/common'
import { Bridge } from '~/bridge/bridge'
import { Client } from '~/client/client'
import {
    User,
    Room,
    Track,
    TrackId,
    MessageGroup,
    MediaItem,
    RoomStatus,
    RoomMember,
    Notification,
} from '~/types'

export type MappedState<K extends string | number, T> = Record<
    K,
    (state: RootState) => T
>

export interface SettingsState {
    trustedSites: Set<string>
}

export interface EntitiesState {
    users: Map<UserId, User>
}

export interface SessionState {
    ready: boolean
    busy: boolean
    connected: boolean
    extension: boolean
    token: string
    userId: UserId
    id: string // session id
    client: Client
    bridge: Bridge
    roomStatus: RoomStatus
    unreadNotifications: boolean
    notifications: Notification<unknown>[]
}

export interface QueueState {
    items: MediaItem[]
    loaded: boolean
    hasMore: boolean
}

export interface RoomState {
    info: Room
    members: RoomMember[]
    permissions: Permissions
    messages: MessageGroup[]
    queue: QueueState
}

export interface PlaybackState {
    url: string
    currentTime: number
    playing: boolean
}

export interface VideoInfo {
    duration: number
    volume: number
    activeTextTrack: TrackId
    activeAudioTrack: TrackId
    textTracks: Track[]
    audioTracks: Track[]
}

export interface PlayerState extends PlaybackState, VideoInfo {
    itemId: string
    ready: boolean
    lastUpdate: number
    updateInterval: number
}

export interface RootState {
    settings: SettingsState
    entities: EntitiesState
    session: SessionState
    room: RoomState
    player: PlayerState
}
