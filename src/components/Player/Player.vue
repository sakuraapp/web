<template>
    <div class="player">
        <template v-if="showMedia">
            <template v-if="isTrusted">
                <Webview :src="player.url" v-show="showWebview" type="player" />
                <Overlay />
            </template>
            <SiteTrustPrompt @allowOnce="allowOnce" v-else />
        </template>
        <Browser v-if="showBrowser" @add="addToQueue" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import Webview from '~/components/Webview.vue'
import Overlay from './Overlay.vue'
import Browser from '~/components/Browser/Browser.vue'
import SiteTrustPrompt from '~/components/SiteTrustPrompt.vue'
import { getHost } from '~/helpers/util'
import { trustedSites } from '~/store/modules/settings'

export default defineComponent({
    components: {
        Webview,
        Overlay,
        Browser,
        SiteTrustPrompt,
    },
    data() {
        return { allowSiteOnce: false }
    },
    computed: {
        showMedia(): boolean {
            return Boolean(this.player.url)
        },
        showWebview(): boolean {
            //return this.player.ready
            return true
        },
        showBrowser(): boolean {
            return !this.showMedia && this.hasPermission('QUEUE_ADD')
        },
        isTrusted(): boolean {
            const host = getHost(this.player.url)

            return (
                this.allowSiteOnce ||
                trustedSites.has(host) ||
                this.trustedSites.has(host)
            )
        },
        ...mapState(['player']),
        ...mapState('settings', ['trustedSites']),
    },
    watch: {
        'player.url': {
            handler() {
                this.allowSiteOnce = false
            },
        },
    },
    methods: {
        addToQueue(url: string) {
            this.$store.dispatch('room/queue/add', url)
        },
        allowOnce() {
            this.allowSiteOnce = true
        },
    },
})
</script>

<style scoped>
.player {
    background: #000;
    position: relative;
    flex-grow: 1;
}
</style>
