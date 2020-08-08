import Vue from 'vue'
import Vuex, { GetterTree, MutationTree, ActionTree } from 'vuex'
import cookies from 'browser-cookies'
import AccountService, { User } from 'account/account'
import Opcodes from '@common/opcodes.json'
import axios from 'helpers/axios'

Vue.use(Vuex)

const RECONNECT_INTERVAL = 15 * 1000 // 15s
const env = process.env.NODE_ENV || 'development'

interface Packet {
    op: number
    d?: unknown
    t?: number
}

interface Message {
    id?: number
    content: string
    author: string
}

interface MessageGroup {
    author: string
    messages: Array<Message>
    messageIds: Array<number>
}

interface QueueItem {
    id: number
    title: string
    icon: string
    author: string
}

interface Room {
    id: string
    owner: string
    users: Array<string>
    messages: Array<MessageGroup>
    queue: Array<QueueItem>
    permissions: Array<number>
}

interface RoomInfo {
    id: string
    owner: string
    private: false
    currentItem?: QueueItem
}

interface BrowserMessage {
    action: string
}

interface WebviewEvent {
    type: string
    target: string
    data: unknown
    t?: number
}

interface CaptionTrack {
    id: string
    label: string
    active: boolean
}

interface PlayerState {
    ready: boolean
    duration: number
    currentTime?: number
    volume: number
    url: string
    playing: boolean
    captions: Array<CaptionTrack>
    updateInterval?: number
}

export interface State {
    token: string
    user: User
    users: Map<string, User>
    room: Room
    invitation: { room: RoomInfo }
    player: PlayerState
    connected: boolean
    ws: WebSocket
    wsReconnect: number
}

export const initialState = (): State => {
    return {
        token: null,
        user: null,
        users: new Map<string, User>(),
        room: null,
        invitation: null,
        player: null,
        connected: false,
        ws: null,
        wsReconnect: null,
    }
}

export const initialPlayerState = (): PlayerState => {
    return {
        ready: false,
        duration: 0,
        currentTime: 0,
        volume: 1,
        url: null,
        playing: false,
        captions: [],
    }
}

function ItemGetter(getContainer: (state: State) => Array<{ author: string }>) {
    return (state: State): Array<{ author: User }> => {
        return getContainer(state).map((item: { author: string }) => {
            return {
                ...item,
                author: state.users.get(item.author),
            }
        })
    }
}

export const getters: GetterTree<State, null> = {
    messages: ItemGetter((state) => state.room.messages),
    queue: ItemGetter((state) => state.room.queue),
}

export const mutations: MutationTree<State> = {
    handleToken(
        state,
        {
            token,
            save = false,
        }: {
            token: string
            save: boolean
        }
    ) {
        if (save) {
            if (token) {
                cookies.set('token', token, {
                    expires: 365,
                    secure: env !== 'development',
                    domain: process.env.COOKIE_DOMAIN,
                })
            } else {
                cookies.erase('token')
            }
        }

        state.token = token
    },

    handleUser(state, user: User) {
        state.users.set(user.id, user)
    },

    handleMyUser(state, user: User) {
        state.user = user
        this.commit('handleUser', user)
    },

    handleRoom(
        state,
        data?: {
            id: string
            owner: string
            users: Array<User>
            permissions: Array<number>
        }
    ) {
        if (data) {
            for (const i in data.users) {
                const user: User = data.users[i]

                this.commit('handleUser', user)
            }

            state.room = Object.assign(data, {
                users: data.users.map((user: User) => user.id),
                messages: [],
                queue: [],
            })
            state.player = initialPlayerState()
        } else {
            state.room = null
            state.player = null
        }
    },

    // FIXME: There has to be a better way to do this
    handlePrivateRoom() {
        return null
    },

    handleRoomNotFound() {
        return null
    },

    handleRoomInvitation(state, room?: RoomInfo) {
        state.invitation = room ? { room } : null
    },

    handleJoinRoom(state, data: { status: number; room: unknown }) {
        switch (data.status) {
            case 200:
                this.commit('handleRoom', data.room)
                break
            case 401:
                this.commit('handlePrivateRoom')
                break
            case 404:
                this.commit('handleRoomNotFound')
        }
    },

    handleUserJoin(state, user: User) {
        this.commit('handleUser', user)

        state.room.users.push(user.id)
    },

    handleUserLeave(state, userId: string) {
        for (const i in state.room.users) {
            const user = state.room.users[i]

            if (user === userId) {
                state.room.users.splice(Number(i), 1)

                break
            }
        }
    },

    handleQueueAdd(state, item: QueueItem) {
        state.room.queue.push(item)
    },

    handleQueueRemove(state, itemId: number) {
        for (const i in state.room.queue) {
            const item = state.room.queue[i]

            if (item.id === itemId) {
                state.room.queue.splice(Number(i), 1)

                break
            }
        }
    },

    handleSetPlaying(state, playing: boolean) {
        const { player } = state

        player.playing = playing

        if (player.updateInterval) {
            clearInterval(player.updateInterval)
            player.updateInterval = null
        }

        if (playing) {
            player.updateInterval = window.setInterval(
                () => player.currentTime++,
                1000
            )
        }

        this.dispatch('sendToPlayer', {
            event: {
                type: 'set-playing',
                data: playing,
            },
        })
    },

    handleSetCurrentTime(state, time: number) {
        state.player.currentTime = time

        this.dispatch('sendToPlayer', {
            event: {
                type: 'seek',
                data: time,
            },
        })
    },

    handleSetVolume(state, volume: number) {
        state.player.volume = volume

        this.dispatch('sendToPlayer', {
            event: {
                type: 'set-volume',
                data: volume,
            },
        })
    },

    handleSetURL(state, url: string) {
        state.player.url = url
    },

    addMessage(state, message: Message) {
        const lastGroupIndex = state.room.messages.length - 1
        const lastGroup = state.room.messages[lastGroupIndex]

        if (lastGroup && lastGroup.author === message.author) {
            state.room.messages[lastGroupIndex].messages.push(message)
        } else {
            state.room.messages.push({
                author: message.author,
                messages: [message],
                messageIds: [],
            })
        }
    },

    setupWindow() {
        this.dispatch('sendWindowMessage', { action: 'sakura-init' })

        window.addEventListener('message', (event: MessageEvent) => {
            if (event.source != window) return

            const data: BrowserMessage = event.data

            if (!data.action || !data.action.startsWith('sakura-')) return

            switch (data.action) {
                case 'sakura-window-poll':
                    this.dispatch('sendWindowMessage', data)
                    break
                case 'sakura-join-room':
                    this.dispatch('handleJoinRoomRequest', data)
                    break
                case 'sakura-webview-event':
                    this.dispatch('handleWebviewEvent', data)
            }
        })
    },

    setupWebSocket(state) {
        const ws = new WebSocket(process.env.WEBSOCKET_SERVER_ADDRESS)

        ws.onopen = () => {
            this.commit('invalidateReconnect')
            this.dispatch('sendWebSocket', {
                op: Opcodes.AUTHENTICATE,
                d: state.token,
            })
        }

        ws.onerror = () => this.commit('setupReconnect')

        ws.onmessage = (e: MessageEvent) => {
            const packet: Packet = JSON.parse(e.data)
            const latency = new Date().getTime() - packet.t

            switch (packet.op) {
                case Opcodes.AUTHENTICATE:
                    if (!packet.d) {
                        AccountService.logout()
                        AccountService.openLogin()
                    } else {
                        state.connected = true
                    }
                    break
                case Opcodes.JOIN_ROOM:
                    this.commit('handleJoinRoom', packet.d)

                    break
                case Opcodes.LEAVE_ROOM:
                    this.commit('handleRoom', null)
                    break
                case Opcodes.ADD_USER: {
                    this.commit('handleUserJoin', packet.d)

                    break
                }
                case Opcodes.REMOVE_USER:
                    this.commit('handleUserLeave', packet.d)

                    break
                case Opcodes.PLAYER_STATE:
                    {
                        const player = packet.d as PlayerState

                        this.commit('handleSetPlaying', player.playing)
                        this.dispatch('handleSeek', {
                            time: player.currentTime,
                            latency,
                        })
                        this.commit('handleSetURL', player.url)
                    }
                    break
                case Opcodes.QUEUE_ADD:
                    this.commit('handleQueueAdd', packet.d)
                    break
                case Opcodes.QUEUE_REMOVE:
                    this.commit('handleQueueRemove', packet.d)
                    break
            }
        }

        state.ws = ws
    },

    setupReconnect(state) {
        state.wsReconnect = window.setInterval(() => {
            if (state.ws && state.ws.readyState === state.ws.OPEN) {
                return this.commit('invalidateReconnect')
            }

            this.commit('setupWebSocket')
        }, RECONNECT_INTERVAL)
    },

    invalidateReconnect(state) {
        if (!state.wsReconnect) return

        clearInterval(state.wsReconnect)
        state.wsReconnect = null
    },
}

export const actions: ActionTree<State, null> = {
    getToken(store): string {
        if (store.state.token) {
            return store.state.token
        }

        const token = cookies.get('token')

        if (token) {
            this.commit('handleToken', token)
        }

        return token
    },

    sendWindowMessage(store, message: unknown) {
        window.postMessage(message, window.location.origin)
    },

    sendWebviewEvent(store, { event }) {
        store.dispatch('sendWindowMessage', {
            action: 'sakura-webview-event',
            ...event,
        })
    },

    sendToPlayer(store, { event }: { event: WebviewEvent }) {
        if (!event.t) {
            event.t = new Date().getTime()
        }

        event.target = 'player'

        store.dispatch('sendWebviewEvent', { event })
    },

    sendWebSocket(store, data: Packet) {
        if (!data.t) {
            data.t = new Date().getTime()
        }

        store.state.ws.send(JSON.stringify(data))
    },

    joinRoom(store, id: string): void {
        store.commit('handleRoomInvitation', null)
        store.dispatch('sendWebSocket', {
            op: Opcodes.JOIN_ROOM,
            d: id,
        })
    },

    leaveRoom(store): void {
        store.dispatch('sendWebSocket', { op: Opcodes.LEAVE_ROOM })
    },

    createRoom(store): void {
        store.dispatch('sendWebSocket', { op: Opcodes.CREATE_ROOM })
    },

    handleJoinRoomRequest(store, data: { id: string }) {
        axios
            .get(`rooms/${data.id}`)
            .then((res) => {
                const room: RoomInfo = res.data

                this.commit('handleRoomInvitation', room)
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    this.commit('handleRoomNotFound')
                }
            })
    },

    handleWebviewEvent(store, evt: WebviewEvent) {
        switch (evt.type) {
            case 'video-ready':
                {
                    const { player } = store.state
                    const data = evt.data as {
                        volume: number
                        duration: number
                        captions: Array<CaptionTrack>
                    }

                    player.volume = data.volume
                    player.duration = data.duration
                    player.captions = data.captions
                    player.ready = true
                }
                break
        }
    },

    submitMessage(store, content: string) {
        const message: Message = {
            content,
            author: store.state.user.id,
        }

        store.commit('addMessage', message)
        store.dispatch('sendMessage', message)
    },

    sendMessage(store, message: Message) {
        axios
            .post(`/rooms/${store.state.room.id}/messages`, {
                content: message.content,
            })
            .then((res) => {
                message.id = res.data.id

                for (const i in store.state.room.messages) {
                    const group = store.state.room.messages[i]

                    if (group.messages.includes(message)) {
                        if (!group.messageIds.includes(message.id)) {
                            group.messageIds.push(message.id)
                        }

                        break
                    }
                }
            })
    },

    queueAdd(store, url: string) {
        store.dispatch('sendWebSocket', {
            op: Opcodes.QUEUE_ADD,
            d: url,
        })
    },

    skip(store) {
        store.dispatch('sendWebSocket', {
            op: Opcodes.QUEUE_REMOVE,
        })
    },

    setPlaying(store, value: boolean) {
        store.commit('handleSetPlaying', value)
        store.dispatch('sendWebSocket', {
            op: Opcodes.PLAYER_STATE,
            d: {
                playing: value,
            },
        })
    },

    seek(store, time: number) {
        if (time < 0) time = 0
        else if (time > store.state.player.duration)
            time = store.state.player.duration

        store.commit('handleSetCurrentTime', time)
        store.dispatch('sendWebSocket', {
            op: Opcodes.PLAYER_STATE,
            d: {
                currentTime: time,
            },
        })
    },

    setVolume(store, value: number) {
        if (value < 0) value = 0
        else if (value > 1) value = 1

        store.commit('handleSetVolume', value)
    },

    handleSeek(store, { time, latency }: { time: number; latency: number }) {
        console.log(store.state.player.currentTime, time + latency / 1000)
        store.commit('handleSetCurrentTime', time + latency / 1000)
    },
}

export default new Vuex.Store({
    state: initialState(),
    getters,
    mutations,
    actions,
})
