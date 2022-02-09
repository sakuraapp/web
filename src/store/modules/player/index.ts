import { Module } from 'vuex'
import { PlayerState, RootState } from '~/store/types'
import mutations from './mutations'
import actions from './actions'
import { initialState } from './state'

export const playerModule: Module<PlayerState, RootState> = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
}

export default playerModule
