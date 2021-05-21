<template>
    <iframe
        :src="url"
        ref="iframe"
        :allow="featurePolicy"
        :sandbox="sandbox"
        :name="name"
        referrerpolicy="origin"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

let frameId = 0

export default defineComponent({
    props: {
        src: String,
        sandbox: {
            type: [Boolean, String],
        },
        type: {
            type: String,
            default: 'normal',
        },
    },
    data() {
        const id = ++frameId

        return {
            url: `about:blank?sakura-webview=${id}`,
            name: `frame-${id}`,
            currentURL: this.src,
            tabId: null,
            frameId: null,
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
        }
    },
    methods: {
        handleMessage(e: MessageEvent) {
            const msg: {
                action: string
                type: string
                frameId: number
                data: {
                    tabId?: number
                    frameId?: number
                    url?: string
                }
            } = e.data

            if (msg.action === 'sakura-webview-event') {
                switch (msg.type) {
                    case 'init':
                        this.tabId = msg.data.tabId
                        this.frameId = msg.data.frameId
                        break
                    case 'get-webview-info':
                        this.$store.dispatch('sendToFrame', {
                            event: {
                                type: 'webview-info',
                                targetFrameId: msg.frameId,
                                data: {
                                    type: this.type,
                                },
                            },
                        })
                        break
                    case 'will-navigate':
                        this.currentURL = msg.data.url
                        break
                }
            }
        },
        sendMessage(msg: unknown) {
            this.$store.dispatch('sendWebviewEvent', { event: msg })
        },
        setURL(url: string) {
            this.$emit('set-url', url)
        },
    },
    watch: {
        src(val: string) {
            this.url = val
        },
    },
    mounted() {
        window.addEventListener('message', this.handleMessage)

        this.url = this.src
    },
    beforeUnmount() {
        window.removeEventListener('message', this.handleMessage)
    },
})
</script>

<style scoped>
iframe {
    flex-grow: 1;
    /* width: 100%; */
    height: 100%;
}
</style>
