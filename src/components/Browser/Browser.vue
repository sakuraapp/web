<template>
    <CloseButton v-if="popup && !src" @click="close" />
    <div :class="{ browser: true, popup }">
        <Homepage v-if="!src" @navigate="navigate" />
        <Navigator
            v-else
            @navigate="navigate"
            @add="add"
            @close="close"
            :url="url"
            :popup="popup"
        >
            <Webview :src="src" @navigate="onNavigate" />
        </Navigator>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Homepage from './Homepage.vue'
import Navigator from './Navigator.vue'
import Webview from '~/components/Webview.vue'
import { isURLValid } from '~/helpers/util'
import CloseButton from '../Popup/CloseButton.vue'

interface BrowserState {
    src: string
    url: string
    history: {
        forward: string[]
        backward: string[]
    }
}

type HistoryDirection = keyof BrowserState['history']

export default defineComponent({
    components: {
        Homepage,
        Webview,
        Navigator,
        CloseButton,
    },
    emits: ['add', 'close'],
    props: {
        popup: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            src: null,
            url: null,
            history: {
                forward: [],
                backward: [],
            },
        } as BrowserState
    },
    methods: {
        getSearchURL(query: string): string {
            return `http://google.com/search?q=${encodeURIComponent(query)}`
        },
        pushHistory(url: string, direction: HistoryDirection): void {
            if (url) {
                const target = this.history[direction]

                if (target[target.length - 1] !== url) {
                    target.push(url)
                }
            }
        },
        navigate(url: string, direction: HistoryDirection = 'backward') {
            this.pushHistory(this.url, direction)

            if (url) {
                if (!isURLValid(url)) {
                    url = this.getSearchURL(url)
                }
            }

            this.url = url
            this.src = url
        },
        onNavigate(url: string) {
            if (this.url !== url) {
                this.pushHistory(url, 'backward')
                this.url = url
            }
        },
        add(url: string) {
            this.$emit('add', url)
        },
        close() {
            this.$emit('close')
        },
    },
    mounted() {
        console.log(this.src, this.url)
    },
})
</script>

<style scoped>
.browser {
    background: rgb(30, 30, 30);
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
}

.browser.popup {
    background: transparent;
}
</style>
