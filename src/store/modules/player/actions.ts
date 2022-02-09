import { Opcode } from '@sakuraapp/common'
import { ActionTree } from 'vuex'
import { PlayerState, RootState } from '~/store/types'
import { TrackId } from '~/types'
import { initialVideoInfo } from './state'

export const actions: ActionTree<PlayerState, RootState> = {
    sendState(store) {
        const { bridge } = store.rootState.session
        const { currentTime, playing, lastUpdate } = store.state

        bridge.sendToPlayer(
            'set-state',
            {
                currentTime,
                playing,
            },
            lastUpdate
        )
    },
    setPlaying(store, playing: boolean) {
        const { bridge, client } = store.rootState.session

        store.commit('handlePlaying', playing)

        bridge.sendToPlayer('set-playing', playing)
        client.send({
            op: Opcode.PLAYER_STATE,
            d: {
                currentTime: store.state.currentTime,
                playing,
            },
        })
    },
    togglePlaying(store) {
        const value = !store.state.playing

        store.dispatch('setPlaying', value)
    },
    seek(store, time: number) {
        const { client } = store.rootState.session

        store.commit('handleCurrentTime', time)
        store.dispatch('seekVideo', time)

        client.send({
            op: Opcode.SEEK,
            d: time,
        })
    },
    seekVideo(store, time: number) {
        const { bridge } = store.rootState.session

        bridge.sendToPlayer('seek', time)
    },
    setVolume(store, value: number) {
        if (value < 0) value = 0
        else if (value > 1) value = 1

        store.commit('handleVolume', value)
        store.dispatch('sendVolume')
    },
    sendVolume(store) {
        const { bridge } = store.rootState.session

        bridge.sendToPlayer('set-volume', store.state.volume)
    },
    setTextTrack(store, trackId: TrackId) {
        const { bridge } = store.rootState.session

        bridge.sendToPlayer('set-text-track', trackId)
        store.commit('handleActiveTextTrack', trackId)
    },
    setAudioTrack(store, trackId: TrackId) {
        const { bridge } = store.rootState.session

        bridge.sendToPlayer('set-audio-track', trackId)
        store.commit('handleActiveAudioTrack', trackId)
    },
    skip(store) {
        const { client } = store.rootState.session

        client.send({ op: Opcode.VIDEO_SKIP, d: null })
    },
    resetInfo(store) {
        store.commit('handleInfo', initialVideoInfo)
    },
}

export default actions
