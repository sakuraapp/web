<template>
    <iframe
        :src="url"
        ref="iframe"
        :allow="featurePolicy"
        :sandbox="sandbox"
        :name="name"
    />
</template>

<script lang="ts">
import Vue from 'vue'

let frameId = 0

export default Vue.extend({
    props: ['src', 'sandbox'],
    data() {
        const id = ++frameId

        return {
            url: `about:blank?sakura-webview=${id}`,
            name: `frame-${id}`,
            currentURL: this.src,
            tabId: null,
            frameId: null,
            featurePolicy: [
                'encrypted-media',
                'picture-in-picture',
                'fullscreen',
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
                    case 'will-navigate':
                        this.currentURL = msg.data.url
                        break
                }
            }
        },
        setURL(url: string) {
            this.src = url
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
    beforeDestroy() {
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
