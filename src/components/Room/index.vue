<template>
    <div class="room">
        <Player v-if="player.url">
            <Webview
                :src="player.url"
                v-show="showPlayer"
                type="player"
                :sandbox="false"
            />
        </Player>
        <div class="placeholderScreen" v-if="showPlaceholder">
            <Logo />
            Waiting for something to play...
        </div>
        <Browser
            @close="handleCloseBrowser"
            v-if="showBrowser"
            :asPopup="browserPopup"
        />
        <Sidebar @queueAddClick="handleShowBrowser" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { hasPermission } from 'helpers/permission'
import { isDevelopment } from 'helpers/util'
import Logo from '../Logo.vue'
import Sidebar from './Sidebar/index.vue'
import Player from './Player/index.vue'
import Webview from '../Webview.vue'
import Browser from '../Browser/index.vue'

export default Vue.extend({
    components: {
        Logo,
        Sidebar,
        Player,
        Webview,
        Browser,
    },
    data() {
        return { browserPopup: false }
    },
    computed: {
        showPlayer() {
            return isDevelopment() || this.player.ready
        },
        showBrowser() {
            return (
                (!this.player.url || this.browserPopup) &&
                hasPermission('QUEUE_ADD')
            )
        },
        showPlaceholder() {
            return !this.player.url && !hasPermission('QUEUE_ADD')
        },
        ...mapState(['room', 'player']),
    },
    methods: {
        handleShowBrowser() {
            if (!this.showBrowser) {
                this.browserPopup = true
            }
        },
        handleCloseBrowser() {
            this.browserPopup = false
        },
    },
})
</script>

<style scoped>
.room {
    height: 100%;
    flex-grow: 1;
    position: relative;
    display: flex;
}
.room .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999999999;
}

.placeholderScreen {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.7em;
}
.placeholderScreen .sakuraLogo {
    font-size: 2.5em;
    margin-bottom: 0.6em;
}
</style>
