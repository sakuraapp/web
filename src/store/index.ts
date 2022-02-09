import { createStore } from 'vuex'
import { RootState } from './types'
import entitiesModule from './modules/entities'
import sessionModule from './modules/session'
import roomModule from './modules/room'
import playerModule from './modules/player'
import settingsModule from './modules/settings'
import settingsPlugin from './modules/settings/plugin'

export default createStore<RootState>({
    modules: {
        settings: settingsModule,
        entities: entitiesModule,
        session: sessionModule,
        room: roomModule,
        player: playerModule,
    },
    plugins: [settingsPlugin],
})
