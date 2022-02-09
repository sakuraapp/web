import { MutationTree } from 'vuex'
import { SettingsState } from '~/store/types'

export const mutations: MutationTree<SettingsState> = {
    handleAddTrustedSite(state, site: string) {
        state.trustedSites.add(site)
    },
}

export default mutations
