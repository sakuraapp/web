import { Store } from 'vuex'
import { RootState, SettingsState } from '~/store/types'
import { initialState } from '.'

const LOCAL_STORAGE_KEY = 'sk_settings'

class SettingsPlugin {
    private store: Store<RootState>

    constructor(store: Store<RootState>) {
        this.store = store
        this.init()
    }

    private getState(): SettingsState {
        return this.store.state.settings
    }

    private serializeState(state: SettingsState): string {
        return JSON.stringify({
            ...state,
            trustedSites: Array.from(state.trustedSites),
        })
    }

    private deserializeState(data: string): SettingsState {
        let state: SettingsState

        try {
            state = JSON.parse(data)
        } catch (err) {
            state = null
        }

        if (!state) {
            state = initialState
        }

        if (state.trustedSites && Array.isArray(state.trustedSites)) {
            state.trustedSites = new Set(state.trustedSites)
        } else {
            state.trustedSites = new Set()
        }

        return state
    }

    private init(): void {
        this.load()
        this.store.subscribe((mutation) => {
            if (mutation.type.startsWith('settings/')) {
                this.save()
            }
        })
    }

    private save(): void {
        const state = this.getState()

        localStorage.setItem(LOCAL_STORAGE_KEY, this.serializeState(state))
    }

    private load(): void {
        const state = this.deserializeState(
            localStorage.getItem(LOCAL_STORAGE_KEY)
        )

        this.store.replaceState({
            ...this.store.state,
            settings: state,
        })
    }
}

export function settingsPlugin(store: Store<RootState>): void {
    new SettingsPlugin(store)
}

export default settingsPlugin
