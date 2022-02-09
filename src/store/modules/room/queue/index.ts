import { Module } from 'vuex'
import { RootState, QueueState } from '~/store/types'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const initialState: QueueState = {
    items: [],
    loaded: false,
    hasMore: false,
}

export const queueModule: Module<QueueState, RootState> = {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions,
}

export default queueModule
