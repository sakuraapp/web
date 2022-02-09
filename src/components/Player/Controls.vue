<template>
    <div class="controls">
        <div class="group" v-if="hasRemote">
            <div class="item">
                <button @click="togglePlay">
                    <FontAwesomeIcon :icon="playBtnIcon" />
                </button>
            </div>
            <div class="item">
                <button @click="skip">
                    <FontAwesomeIcon icon="step-forward" />
                </button>
            </div>
        </div>
        <TimeIndicator />
        <div class="right group">
            <div class="item time">{{ time }}</div>
            <VolumeControls />
            <TrackControls />
            <div class="item" @click="toggleFullscreen">
                <button>
                    <FontAwesomeIcon :icon="fullscreenIcon" />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { formatSeconds, isFullscreen, toggleFullscreen } from '~/helpers/util'
import { MappedState, PlayerState } from '~/store/types'
import TimeIndicator from './TimeIndicator.vue'
import TrackControls from './Track/TrackControls.vue'
import VolumeControls from './Volume/VolumeControls.vue'

export default defineComponent({
    components: { TimeIndicator, VolumeControls, TrackControls },
    emits: ['activate'],
    data() {
        return { isFullscreen: isFullscreen() }
    },
    computed: {
        playBtnIcon(): string {
            return this.player.playing ? 'pause' : 'play'
        },
        time(): string {
            const { duration, currentTime } = this.player
            let time = '00:00'

            if (duration && duration > currentTime) {
                time = formatSeconds(duration - currentTime)
            }

            return `-${time}`
        },
        fullscreenIcon(): string {
            return this.isFullscreen ? 'compress' : 'expand'
        },
        hasRemote(): boolean {
            return this.hasPermission('VIDEO_REMOTE')
        },
        ...(mapState(['player']) as MappedState<'player', PlayerState>),
    },
    methods: {
        togglePlay() {
            this.$store.dispatch('player/togglePlaying')
        },
        toggleFullscreen() {
            toggleFullscreen()
        },
        skip() {
            this.$store.dispatch('player/skip')
        },
        onKeyDown(e: KeyboardEvent): void {
            const { currentTime, volume } = this.player
            const target = e.target as HTMLElement
            const inputTags = ['INPUT', 'TEXTAREA']

            if (target && inputTags.includes(target.tagName)) {
                return
            }

            this.$emit('activate')

            switch (e.key) {
                case 'f':
                    this.toggleFullscreen()
                    break
                case ' ':
                    this.togglePlay()
                    break
                case 'ArrowLeft':
                    this.$store.dispatch('player/seek', currentTime - 5)
                    break
                case 'ArrowRight':
                    this.$store.dispatch('player/seek', currentTime + 5)
                    break
                case 'ArrowUp':
                    this.$store.dispatch('player/setVolume', volume + 0.2)
                    break
                case 'ArrowDown':
                    this.$store.dispatch('player/setVolume', volume - 0.2)
            }
        },
        onResize() {
            this.isFullscreen = isFullscreen()
        },
    },
    mounted() {
        document.addEventListener('keydown', this.onKeyDown)
        window.addEventListener('resize', this.onResize)
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('resize', this.onResize)
    },
})
</script>

<style scoped>
.controls {
    align-self: flex-end;
    justify-self: center;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    font-size: 1.2em;
    padding: 1.6em;
}

.group {
    display: flex;
    align-items: center;
    font-size: 1.2em;
    position: relative;
}
.group:not(:last-child) {
    margin-right: 1.4em;
}
.group.right {
    margin-left: 1.2em;
}

.item {
    position: relative;
}
.item:not(:last-child) {
    margin-right: 1.2em;
}

::v-deep(button) {
    color: #fff;
    border: 0;
    padding: 0;
    background: transparent;
    font-size: 1em;
    cursor: pointer;
    outline: none;
}

.time {
    font-size: 0.64em;
}
</style>
