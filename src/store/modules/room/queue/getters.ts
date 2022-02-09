import { GetterTree } from 'vuex'
import { QueueState, RootState } from '~/store/types'
import { MediaItemInfo } from '~/types'

export const getters: GetterTree<QueueState, RootState> = {
    items(state, getters, rootState): MediaItemInfo[] {
        const { users } = rootState.entities

        return state.items.map((item) => {
            return {
                ...item,
                author: users.get(item.author),
            }
        })
    },
}

export default getters
