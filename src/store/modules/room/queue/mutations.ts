import { MutationTree } from 'vuex'
import { QueueState } from '~/store/types'
import { MediaItem } from '~/types'

export const mutations: MutationTree<QueueState> = {
    handleReset(state) {
        state.items = []
    },
    handleAddItem(state, item: MediaItem) {
        state.items.push(item)
    },
    handleAddItems(state, items: MediaItem[]) {
        state.items.push(...items)
    },
    handleRemoveItem(state, id: string) {
        for (const i in state.items) {
            if (state.items[i].id == id) {
                state.items.splice(Number(i), 1)
                return
            }
        }
    },

    handleHasMore(state, hasMore: boolean) {
        state.hasMore = hasMore
    },
}

export default mutations
