import { MutationTree } from 'vuex'
import { PlayerState, VideoInfo } from '~/store/types'
import { TrackId } from '~/types'

export const mutations: MutationTree<PlayerState> = {
    handleItemId(state, id: string) {
        state.itemId = id
    },
    handleURL(state, url: string) {
        if (state.url !== url) {
            state.ready = false
            // state.isLivestream = false
        }

        state.url = url
        state.playing = false
        state.currentTime = 0
    },
    handlePlaying(state, playing: boolean) {
        state.playing = playing

        const stopUpdate = () => {
            clearInterval(state.updateInterval)
            state.updateInterval = null
        }

        if (state.updateInterval) {
            stopUpdate()
        }

        if (playing) {
            state.updateInterval = window.setInterval(() => {
                state.currentTime++

                if (state.currentTime >= state.duration) {
                    stopUpdate()
                }
            }, 1000)
        }
    },
    handleCurrentTime(state, time: number) {
        state.currentTime = time
        state.lastUpdate = new Date().getTime()
    },
    handleInfo(state, info: VideoInfo) {
        state.duration = info.duration
        state.textTracks = info.textTracks
        state.audioTracks = info.audioTracks
        state.activeTextTrack = info.activeTextTrack
        state.activeAudioTrack = info.activeAudioTrack
        // state.isLivestream = info.isLivestream
    },
    handleReady(state, ready: boolean) {
        state.ready = ready
    },
    handleVolume(state, volume: number) {
        state.volume = volume
    },
    handleActiveTextTrack(state, trackId: TrackId) {
        state.activeTextTrack = trackId
    },
    handleActiveAudioTrack(state, trackId: TrackId) {
        state.activeAudioTrack = trackId
    },
}

export default mutations
