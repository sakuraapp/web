import { Role } from '@sakuraapp/common'
import { GetterTree } from 'vuex'
import { RoomState, RootState } from '~/store/types'
import { MessageGroupInfo, RoomMember, RoomMemberInfo } from '~/types'

export const getters: GetterTree<RoomState, RootState> = {
    members(state, getters, rootState): RoomMemberInfo[] {
        const { users } = rootState.entities

        return state.members.map((member) => {
            return {
                ...member,
                user: users.get(member.user),
            }
        })
    },
    member(state, getters, rootState): RoomMember {
        const myId = rootState.session.userId

        return state.members.find((member) => member.user === myId)
    },
    roles(state, getters): Role[] {
        return getters['member'].roles
    },
    messages(state, getters, rootState): MessageGroupInfo[] {
        const { users } = rootState.entities

        return state.messages.map((group) => {
            return {
                author: users.get(group.author),
                messages: group.messages,
            }
        })
    },
}

export default getters
