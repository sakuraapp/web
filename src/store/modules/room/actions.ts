import { Opcode, RoomId, UserId } from '@sakuraapp/common'
import { reactive } from 'vue'
import { ActionTree } from 'vuex'
import axios from '~/helpers/axios'
import router from '~/router'
import { RoomState, RootState } from '~/store/types'
import {
    JoinRoomData,
    Message,
    MessageGroup,
    MessageGroupMember,
    RoleUpdateData,
    RoomStatus,
    RoomUpdateData,
} from '~/types'
import { initialState as initialQueueState } from './queue'

interface AddMessageResponse {
    group: MessageGroup
    member: MessageGroupMember
}

export const actions: ActionTree<RoomState, RootState> = {
    onJoinRoom(store, data: JoinRoomData) {
        const users = data.members.map((member) => member.user)
        const members = data.members.map((member) => {
            return {
                ...member,
                user: member.user.id,
            }
        })

        const state: RoomState = {
            info: data.room,
            members,
            permissions: data.permissions,
            messages: [],
            queue: initialQueueState,
        }

        this.commit('entities/handleUsers', users)
        this.commit('session/handleBusy', false)
        this.commit('session/handleRoomStatus', RoomStatus.Joined)

        store.commit('handleRoom', state)
        store.commit('queue/handleReset')

        store.dispatch('queue/fetch')
    },
    async createRoom(store): Promise<void> {
        const { session } = store.rootState

        if (session.busy) {
            return
        }

        try {
            const { data } = await axios.post('/rooms')

            router.push({
                name: 'room',
                params: { id: data.room.id },
            })
        } catch (err) {
            console.error(err)
        }
    },
    joinRoom(store, roomId: RoomId) {
        const { session } = store.rootState

        if (session.busy) {
            return
        }

        this.commit('session/handleRoomStatus', RoomStatus.Joining)
        this.commit('session/handleBusy', true)

        this.dispatch('session/sendClient', {
            op: Opcode.JOIN_ROOM,
            d: roomId,
        })
    },
    onLeaveRoom(store) {
        router.push({ name: 'app' })

        this.commit('session/handleRoomStatus', RoomStatus.None)

        store.commit('handleRoom', {})
        store.commit('queue/handleReset')
    },
    leaveRoom(store) {
        store.dispatch('onLeaveRoom')
        this.dispatch('session/sendClient', { op: Opcode.LEAVE_ROOM })
    },
    addMessage(store, message: Message): AddMessageResponse {
        const lastGroupIndex = store.state.messages.length - 1
        const lastGroup = store.state.messages[lastGroupIndex]

        const member: MessageGroupMember = reactive({
            id: message.id,
            content: message.content,
        })

        let group = lastGroup

        if (lastGroup && lastGroup.author === message.author) {
            store.commit('handleMessageGroupMember', {
                group: lastGroupIndex,
                member,
            })
        } else {
            group = reactive({
                author: message.author,
                messages: [member],
                messageIds: [],
            })

            store.commit('handleMessageGroup', group)
        }

        return {
            group,
            member,
        }
    },
    updateRoom(store, data: RoomUpdateData) {
        const roomId = store.state.info.id

        return axios.put(`/rooms/${roomId}`, data)
    },
    async sendMessage(store, content: string) {
        const message: Message = {
            author: store.rootState.session.userId,
            content,
        }

        const roomId = store.state.info.id
        const { member, group }: AddMessageResponse = await store.dispatch(
            'addMessage',
            message
        )

        try {
            const { data } = await axios.post(`/rooms/${roomId}/messages`, {
                content,
            })

            member.id = data.message.id
            group.messageIds.push(member.id)
        } catch (err) {
            console.error(err)
        }
    },
    kick(store, userId: UserId) {
        this.dispatch('session/sendClient', {
            op: Opcode.KICK_USER,
            d: userId,
        })
    },
    onKick(store) {
        store.dispatch('onLeaveRoom')
    },
    addRole(store, data: RoleUpdateData) {
        this.dispatch('session/sendClient', {
            op: Opcode.ADD_ROLE,
            d: data,
        })

        store.dispatch('onAddRole', data)
    },
    removeRole(store, data: RoleUpdateData) {
        this.dispatch('session/sendClient', {
            op: Opcode.REMOVE_ROLE,
            d: data,
        })

        store.dispatch('onRemoveRole', data)
    },
    onAddRole(store, data: RoleUpdateData) {
        store.commit('handleAddMemberRole', data)
    },
    onRemoveRole(store, data: RoleUpdateData) {
        store.commit('handleRemoveMemberRole', data)
    },
    acceptRoomJoinRequest(store, userId: UserId) {
        this.dispatch('session/sendClient', {
            op: Opcode.ROOM_JOIN_REQUEST,
            d: userId,
        })
    },
}

export default actions
