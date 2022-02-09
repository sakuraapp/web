import { Opcode } from '@sakuraapp/common'
import { EventEmitter } from 'events'
import { Store } from 'vuex'
import { retry, PartialAttemptOptions } from '@lifeomic/attempt'
import { AccountService } from '~/account/account'
import { getEnv } from '~/helpers/util'
import { PlaybackState, RootState } from '~/store/types'
import { MediaItem, Packet, RoomStatus } from '~/types'
import { Router } from 'vue-router'

export type ReconnectionOptions = PartialAttemptOptions<void>

export interface ClientOptions {
    store: Store<RootState>
    router: Router
    reconnect: ReconnectionOptions
}

export type Serialized = string

export class Client extends EventEmitter {
    private socket: WebSocket
    private store: Store<RootState>
    private router: Router

    private reconnectOpts: ReconnectionOptions
    private reconnecting: boolean

    private get address(): string {
        return getEnv('WEBSOCKET_SERVER_ADDRESS')
    }

    private get state(): RootState {
        return this.store.state
    }

    constructor(opts: ClientOptions) {
        super()

        this.store = opts.store
        this.router = opts.router
        this.reconnectOpts = opts.reconnect
    }

    private serialize<T>(data: Packet<T>): Serialized {
        return JSON.stringify(data)
    }

    private deserialize<T>(data: Serialized): Packet<T> {
        return JSON.parse(data)
    }

    send<T>(packet: Packet<T>): void {
        if (!packet.t) {
            packet.t = Date.now()
        }

        return this.socket.send(this.serialize(packet))
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.socket = new WebSocket(this.address)
            let resolved = false

            if (!this.reconnecting) {
                this.once('connect', () => {
                    resolve()
                    resolved = true
                })
            }

            this.socket.addEventListener('open', () => {
                this.send({
                    op: Opcode.AUTHENTICATE,
                    d: {
                        token: this.state.session.token,
                        sessionId: this.state.session.id,
                    },
                })
            })

            this.socket.addEventListener('message', (evt) => {
                const data = this.deserialize(evt.data)

                this.handle(data)
            })

            this.socket.addEventListener('error', (evt) => {
                console.error(evt)

                if (this.socket.readyState === WebSocket.OPEN) {
                    this.socket.close()
                }
            })

            this.socket.addEventListener('close', (evt) => {
                this.emit('disconnect')

                // only reject IF this is being called by a reconnection loop (and if not already resolved)
                if (!resolved && this.reconnecting) {
                    reject(evt)
                }

                // 1006 = abnormal disconnect
                if (evt.code === 1006 && !this.reconnecting) {
                    this.reconnecting = true

                    retry(() => this.connect(), this.reconnectOpts)
                }
            })
        })
    }

    private handle(packet: Packet): void {
        switch (packet.op) {
            case Opcode.AUTHENTICATE:
                if (!packet.d) {
                    AccountService.logout()
                    AccountService.openLogin()
                } else {
                    const { sessionId } = packet.d as { sessionId: string }
                    const { state } = this.store

                    const isJoining =
                        state.session.roomStatus === RoomStatus.Joining

                    const oldId = state.session.id
                    let roomId = state.room.info?.id

                    if (isJoining) {
                        const { currentRoute } = this.router

                        roomId = Number(currentRoute.value.params.id)
                    }

                    this.store.commit('session/handleConnected', true)
                    this.store.commit('session/handleSessionId', sessionId)

                    if (oldId && oldId !== sessionId && roomId) {
                        this.store.commit('room/handleRoom', {})
                        this.store.dispatch('room/joinRoom', roomId)
                    } else if (isJoining) {
                        this.store.dispatch('room/joinRoom', roomId)
                    }

                    this.emit('connect')
                }
                break
            case Opcode.JOIN_ROOM:
                if (!packet.d) {
                    this.store.commit('session/handleBusy', false)
                } else {
                    this.store.dispatch('room/onJoinRoom', packet.d)
                }
                break
            case Opcode.ROOM_JOIN_REQUEST:
                {
                    const { state } = this.store
                    const { currentRoute } = this.router

                    if (state.session.roomStatus === RoomStatus.Joining) {
                        const currRoomId = Number(currentRoute.value.params.id)

                        if (Number(packet.d) === currRoomId) {
                            this.store.commit('session/handleBusy', false)
                            this.store.dispatch('room/joinRoom', currRoomId)
                        }
                    }
                }
                break
            case Opcode.SEND_MESSAGE:
                this.store.commit('room/handleMessage', packet.d)
                break
            case Opcode.QUEUE_ADD:
                this.store.commit('room/queue/handleAddItem', packet.d)
                break
            case Opcode.QUEUE_REMOVE:
                this.store.commit('room/queue/handleRemoveItem', packet.d)
                break
            case Opcode.VIDEO_SET:
                {
                    const item = packet.d as MediaItem
                    const url = item?.url
                    const oldURL = this.store.state.player.url

                    this.store.commit('player/handleItemId', item?.id)
                    this.store.commit('player/handleURL', url)

                    if (oldURL) {
                        if (url === oldURL) {
                            this.store.dispatch('player/sendState')
                        } else {
                            this.store.dispatch('player/resetInfo')
                        }
                    }
                }
                break
            case Opcode.PLAYER_STATE:
                {
                    const state = packet.d as PlaybackState
                    let { currentTime } = state

                    console.log(state)

                    if (state.playing) {
                        const now = new Date().getTime()
                        const latency = now - (packet.t || now)

                        currentTime += latency / 1000
                    }

                    this.store.commit('player/handlePlaying', state.playing)
                    this.store.commit('player/handleCurrentTime', currentTime)

                    this.store.dispatch('player/sendState')
                }
                break
            case Opcode.SEEK:
                {
                    const { playing } = this.store.state.player
                    let time = packet.d as number

                    if (playing) {
                        const now = new Date().getTime()
                        const latency = now - (packet.t || now)

                        time += latency / 1000
                    }

                    this.store.commit('player/handleCurrentTime', time)
                    this.store.dispatch('player/seekVideo', time)
                }
                break
            case Opcode.UPDATE_ROOM:
                this.store.commit('room/handleRoomUpdate', packet.d)
                break
            case Opcode.KICK_USER:
                this.store.dispatch('room/onKick')
                break
            case Opcode.ADD_ROLE:
                this.store.dispatch('room/onAddRole', packet.d)
                break
            case Opcode.REMOVE_ROLE:
                this.store.dispatch('room/onRemoveRole', packet.d)
                break
            case Opcode.ADD_NOTIFICATION:
                this.store.commit('session/handleAddNotification', packet.d)
        }
    }
}
