import { PlayerState, VideoInfo } from '~/store/types'

export const initialVideoInfo: VideoInfo = {
    duration: 0,
    volume: 1,
    textTracks: [],
    audioTracks: [],
    activeTextTrack: null,
    activeAudioTrack: null,
}

export const initialState: PlayerState = {
    itemId: null,
    url: null,
    ready: false,
    currentTime: 0,
    playing: false,
    ...initialVideoInfo,
    lastUpdate: null,
    updateInterval: null,
}
