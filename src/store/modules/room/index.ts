import { Module } from 'vuex'
import { RootState, RoomState } from '~/store/types'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import queueModule from './queue'

const initialState: Omit<RoomState, 'queue'> = {
    info: null,
    members: null,
    permissions: null,
    messages: null,
}

export const roomModule: Module<RoomState, RootState> = {
    namespaced: true,
    state: initialState as RoomState,
    getters,
    mutations,
    actions,
    modules: {
        queue: queueModule,
    },
}

export default roomModule
