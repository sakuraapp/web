import { ActionTree } from 'vuex'
import { BrokerMode } from '@sakuraapp/ext-message-broker'
import { AccountService } from '~/account/account'
import { Client } from '~/client/client'
import { RootState, SessionState } from '~/store/types'
import { Packet } from '~/types'
import { Bridge } from '~/bridge/bridge'
import { getExtensionId } from '~/helpers/util'
import { Opcode, UserId } from '@sakuraapp/common'
import router from '~/router'

export const actions: ActionTree<SessionState, RootState> = {
    getToken(store) {
        const token = AccountService.getToken()

        store.commit('handleToken', token)
    },
    saveToken(store, token?: string) {
        AccountService.setToken(token)

        store.commit('handleToken', token)
    },
    async setupClient(store): Promise<void> {
        const client = new Client({
            store: this,
            router: router,
            reconnect: {
                delay: 1000,
                maxDelay: 30 * 1000,
                maxAttempts: 0,
                factor: 2,
                jitter: false,
            },
        })

        client.on('disconnect', () => {
            store.commit('handleBusy', false) // todo: re-evaluate if this is the right move (is busy only used by client requests?)
        })

        store.commit('handleClient', client)

        await client.connect()
    },
    setupBridge(store): void {
        if (store.state.bridge) {
            store.state.bridge.destroy()
        }

        const extensionId = getExtensionId()

        if (!extensionId) {
            return
        }

        const bridge = new Bridge({
            mode: BrokerMode.Direct,
            extensionId: extensionId,
        })

        bridge.on('init', () => {
            store.commit('handleExtension', true)
        })

        bridge.on('window-poll', (e) => {
            e.reply('window-poll')
        })

        bridge.on('video-ready', (e) => {
            this.commit('player/handleInfo', e.data)

            this.dispatch('player/sendVolume')
            this.dispatch('player/sendState')

            this.commit('player/handleReady', true)
            console.log('tester')
        })

        bridge.on('video-ended', () => {
            store.dispatch('sendClient', {
                op: Opcode.VIDEO_END,
                d: store.rootState.player.itemId,
            })
        })

        bridge.send('init')

        store.commit('handleBridge', bridge)
    },
    sendClient(store, message: Packet): void {
        store.state.client.send(message)
    },
    acceptRoomJoinRequest(store, userId: UserId): void {
        store.dispatch('sendClient', {
            op: Opcode.ROOM_JOIN_REQUEST,
            d: userId,
        })
    },
}

export default actions
