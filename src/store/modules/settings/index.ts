import { Module } from 'vuex'
import { SettingsState, RootState } from '../../types'
import mutations from './mutations'

export const trustedSites = new Set<string>([
    'www.youtube.com',
    'm.youtube.com',
    'youtube.com',
    'www.netflix.com',
    'netflix.com',
])

export const initialState: SettingsState = {
    trustedSites: new Set(),
}

export const settingsModule: Module<SettingsState, RootState> = {
    namespaced: true,
    state: initialState,
    mutations,
}

export default settingsModule
