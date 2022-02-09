import { Opcode } from '@sakuraapp/common'
import { ActionTree } from 'vuex'
import axios from '~/helpers/axios'
import { getHost } from '~/helpers/util'
import { QueueState, RootState } from '~/store/types'
import { MediaItem } from '~/types'

interface FetchOpts {
    limit: number
    after?: string
}

const defaultFetchOpts = {
    limit: 20,
}

export const actions: ActionTree<QueueState, RootState> = {
    add(store, url: string) {
        this.commit('settings/handleAddTrustedSite', getHost(url))
        this.dispatch('session/sendClient', {
            op: Opcode.QUEUE_ADD,
            d: url,
        })
    },
    remove(store, id: string) {
        this.dispatch('session/sendClient', {
            op: Opcode.QUEUE_REMOVE,
            d: id,
        })
    },
    async fetch(store, params: FetchOpts = defaultFetchOpts) {
        const roomId = store.rootState.room.info.id
        const { data } = await axios.get(`/rooms/${roomId}/queue`, { params })
        const { items } = data as { items: MediaItem[] }

        if (items) {
            store.commit('handleAddItems', items)
            store.commit('handleHasMore', items.length === params.limit)
        }
    },
}

export default actions
