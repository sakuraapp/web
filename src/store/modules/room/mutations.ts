import { Permissions } from '@sakuraapp/common'
import { MutationTree } from 'vuex'
import { RoomState } from '~/store/types'
import {
    Message,
    MessageGroup,
    MessageGroupMember,
    RoleUpdateData,
    RoomUpdateData,
} from '~/types'

interface MemberOpts {
    group: number
    member: MessageGroupMember
}

export const mutations: MutationTree<RoomState> = {
    handleRoom(state, room: RoomState) {
        state.info = room.info
        state.permissions = room.permissions
        state.members = room.members
        state.messages = room.messages
    },
    handleRoomUpdate(state, info: RoomUpdateData) {
        state.info.name = info.name
        state.info.private = info.private
    },
    handleMessageGroup(state, group: MessageGroup) {
        state.messages.push(group)
    },
    handleMessageGroupMember(state, { group, member }: MemberOpts) {
        state.messages[group].messages.push(member)
    },
    handleMessage(state, message: Message) {
        const lastGroupIndex = state.messages.length - 1
        const lastGroup = state.messages[lastGroupIndex]

        const msg: MessageGroupMember = {
            id: message.id,
            content: message.content,
        }

        if (lastGroup && lastGroup.author === message.author) {
            lastGroup.messages.push(msg)
        } else {
            state.messages.push({
                author: message.author,
                messages: [msg],
                messageIds: [],
            })
        }
    },
    handleAddMemberRole(state, data: RoleUpdateData) {
        for (const i in state.members) {
            const member = state.members[i]

            if (member.user === data.userId) {
                if (!member.roles.includes(data.roleId)) {
                    member.roles.push(data.roleId)
                }

                break
            }
        }
    },
    handleRemoveMemberRole(state, data: RoleUpdateData) {
        for (const i in state.members) {
            const member = state.members[i]

            if (member.user === data.userId) {
                const i = member.roles.indexOf(data.roleId)

                if (i > -1) {
                    member.roles.splice(i, 1)
                }

                break
            }
        }
    },
    handlePermissions(state, permissions: Permissions) {
        state.permissions = permissions
    },
}

export default mutations
