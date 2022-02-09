<template>
    <iframe
        :src="url"
        ref="iframe"
        :allow="featurePolicy"
        referrerpolicy="origin"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MessageEvent, SourceInfo } from '@sakuraapp/ext-message-broker'
import { Bridge } from '~/bridge/bridge'

let webviewId = 0

export default defineComponent({
    props: {
        src: String,
        type: {
            type: String,
            default: 'normal',
        },
    },
    emits: ['navigate'],
    data() {
        const id = ++webviewId

        return {
            url: `about:blank?sakura-webview=${id}`,
            currentURL: this.src,
            tabId: 0,
            frameId: 0,
            webviewId: id,
            featurePolicy: [
                'midi',
                'fullscreen',
                'geolocation',
                'picture-in-picture',
                'encrypted-media',
                'autoplay',
            ]
                .map((feature) => `${feature} *`)
                .join('; '),
            sandboxPolicy: [
                'forms',
                'popups',
                'presentation',
                'same-origin',
                'scripts',
            ]
                .filter(Boolean)
                .map((feature) => `allow-${feature}`)
                .join(' '),
        }
    },
    computed: {
        bridge(): Bridge {
            return this.$store.state.session.bridge
        },
    },
    methods: {
        onWebviewInit(e: MessageEvent<SourceInfo>) {
            this.tabId = e.data.tabId
            this.frameId = e.data.frameId || 0
        },
        getWebviewInfo(e: MessageEvent) {
            if (e.source.webviewId === this.webviewId) {
                e.reply('webview-info', { type: this.type })
            }
        },
        onWillNavigate(e: MessageEvent<string>) {
            this.currentURL = e.data
        },
    },
    watch: {
        src(val: string) {
            this.url = val
        },
        currentURL(val: string) {
            this.$emit('navigate', val)
        },
    },
    mounted() {
        this.bridge.on('webview-init', this.onWebviewInit)
        this.bridge.on('get-webview-info', this.getWebviewInfo)
        this.bridge.on('will-navigate', this.onWillNavigate)

        this.url = this.src || ''
    },
    unmounted() {
        this.bridge.off('webview-init', this.onWebviewInit)
        this.bridge.off('get-webview-info', this.getWebviewInfo)
        this.bridge.off('will-navigate', this.onWillNavigate)
    },
})
</script>

<style scoped>
iframe {
    flex-grow: 1;
    width: 100%;
    height: 100%;
}
</style>
