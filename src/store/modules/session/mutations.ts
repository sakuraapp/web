import { UserId } from '@sakuraapp/common'
import { MutationTree } from 'vuex'
import { Bridge } from '~/bridge/bridge'
import { Client } from '~/client/client'
import { SessionState } from '~/store/types'
import { Notification, RoomStatus } from '~/types'

export const mutations: MutationTree<SessionState> = {
    handleReady(state, ready: boolean) {
        state.ready = ready
    },
    handleBusy(state, busy: boolean) {
        state.busy = busy
    },
    handleConnected(state, connected: boolean) {
        state.connected = connected
    },
    handleExtension(state, extension: boolean) {
        state.extension = extension
    },
    handleToken(state, token: string) {
        state.token = token
    },
    handleSessionId(state, sessionId: string) {
        state.id = sessionId
    },
    handleUserId(state, userId: UserId) {
        state.userId = userId
    },
    handleClient(state, client: Client) {
        state.client = client
    },
    handleBridge(state, bridge: Bridge) {
        state.bridge = bridge
    },
    handleRoomStatus(state, status: RoomStatus) {
        state.roomStatus = status
    },
    handleUnreadNotifications(state, value: boolean) {
        state.unreadNotifications = value
    },
    handleAddNotification(state, notification: Notification<unknown>) {
        state.notifications.push(notification)
        state.unreadNotifications = true
    },
    handleRemoveNotification(state, id: string) {
        for (const i in state.notifications) {
            const notification = state.notifications[i]

            if (notification.id === id) {
                state.notifications.splice(Number(i), 1)

                break
            }
        }
    },
}

export default mutations
