import { Module } from 'vuex'
import { SessionState, RootState } from '../../types'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { RoomStatus } from '~/types'

export const initialState: SessionState = {
    ready: false,
    busy: false,
    connected: false,
    extension: false,
    token: null,
    userId: null,
    id: null,
    client: null,
    bridge: null,
    roomStatus: RoomStatus.None,
    unreadNotifications: false,
    notifications: [],
}

export const sessionModule: Module<SessionState, RootState> = {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions,
}

export default sessionModule
