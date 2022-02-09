import { GetterTree } from 'vuex'
import { RootState, SessionState } from '~/store/types'
import { User } from '~/types'

export const getters: GetterTree<SessionState, RootState> = {
    user(state, getters, rootState): User {
        return rootState.entities.users.get(state.userId)
    },
}

export default getters
