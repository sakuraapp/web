<template>
    <iframe :src="url" ref="iframe" :allow="featurePolicy" :name="name" />
</template>

<script lang="ts">
import Vue from 'vue'

let frameId = 0

export default Vue.extend({
    props: ['src'],
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
                data: {
                    tabId?: number
                    frameId?: number
                    url?: string
                }
            } = e.data

            switch (msg.action) {
                case 'sakura-webview-init':
                    this.tabId = msg.data.tabId
                    this.frameId = msg.data.frameId

                    break
                case 'sakura-webview-will-navigate':
                    this.currentURL = msg.data.url
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
