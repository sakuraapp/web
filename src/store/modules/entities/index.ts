import { Module, MutationTree } from 'vuex'
import { User } from '~/types'
import { EntitiesState, RootState } from '../../types'

export const initialState: EntitiesState = {
    users: new Map(),
}

export const mutations: MutationTree<EntitiesState> = {
    handleUser(state, user: User) {
        state.users.set(user.id, user)
    },
    handleUsers(state, users: User[]) {
        for (const user of users) {
            state.users.set(user.id, user)
        }
    },
}

export const entitiesModule: Module<EntitiesState, RootState> = {
    namespaced: true,
    state: initialState,
    mutations,
}

export default entitiesModule
