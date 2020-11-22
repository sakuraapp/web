<template>
    <div id="controls">
        <div class="controls">
            <!-- <div class="item">
                <button>
                    <FontAwesomeIcon icon="step-backward" />
                </button>
            </div> -->
            <div class="item" v-if="showControls">
                <button @click="togglePlay">
                    <FontAwesomeIcon
                        :icon="player.playing ? 'pause' : 'play'"
                    />
                </button>
            </div>
            <div class="item">
                <button @click="skip">
                    <FontAwesomeIcon icon="step-forward" />
                </button>
            </div>
        </div>
        <TimeIndicator v-visible="showControls" />
        <div class="right">
            <div class="time" v-visible="showControls">-{{ timeLeft }}</div>
            <div class="controls">
                <VolumeControls v-visible="showControls" />
                <div
                    class="item captions"
                    v-visible="showControls"
                    v-if="player.captions.length > 0"
                >
                    <div class="list">
                        <div
                            v-for="caption in player.captions"
                            :key="caption.id"
                            :class="{ caption: true, active: caption.active }"
                            @click="setCaptionTrack(caption.id)"
                        >
                            {{ caption.label }}
                        </div>
                    </div>
                    <button>
                        <FontAwesomeIcon icon="closed-captioning" />
                    </button>
                </div>
                <div class="item" @click="toggleFullscreen">
                    <button>
                        <FontAwesomeIcon :icon="fullscreenIcon" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { formatSeconds } from 'helpers/util'
import TimeIndicator from './TimeIndicator.vue'
import VolumeControls from './VolumeControls.vue'

export default Vue.extend({
    components: {
        TimeIndicator,
        VolumeControls,
    },
    data() {
        return { fullscreen: document.fullscreenElement !== null }
    },
    computed: {
        timeLeft(): string {
            if (!this.player.duration) return '00:00'

            return formatSeconds(this.player.duration - this.player.currentTime)
        },
        fullscreenIcon(): string {
            return this.fullscreen ? 'compress' : 'expand'
        },
        showControls(): boolean {
            return !this.player.isLivestream
        },
        ...mapState(['player']),
    },
    methods: {
        togglePlay() {
            const value = !this.player.playing

            this.$store.dispatch('setPlaying', value)
        },
        skip() {
            this.$store.dispatch('skip')
        },
        setCaptionTrack(id: string) {
            this.$store.dispatch('setCaptionTrack', id)
        },
        toggleFullscreen() {
            if (this.fullscreen) {
                document.exitFullscreen()
            } else {
                document.body.requestFullscreen()
            }

            this.fullscreen = !this.fullscreen
        },
        onKeyDown(e: KeyboardEvent) {
            const { currentTime, volume } = this.player
            const target = e.target as HTMLElement
            const inputTags = ['input', 'textarea']

            if (target && inputTags.includes(target.tagName.toLowerCase())) {
                return
            }

            switch (e.key) {
                case 'f':
                    this.toggleFullscreen()
                    break
                case ' ':
                    this.togglePlay()
                    break
                case 'ArrowLeft':
                    this.$store.dispatch('seek', currentTime - 5)
                    break
                case 'ArrowRight':
                    this.$store.dispatch('seek', currentTime + 5)
                    break
                case 'ArrowUp':
                    this.$store.dispatch('setVolume', volume + 0.2)
                    break
                case 'ArrowDown':
                    this.$store.dispatch('setVolume', volume - 0.2)
            }
        },
        onFullscreenChange() {
            this.fullscreen = document.fullscreenElement !== null
        },
    },
    mounted() {
        document.addEventListener('keydown', this.onKeyDown)
        document.addEventListener('fullscreenchange', this.onFullscreenChange)
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.onKeyDown)
        document.removeEventListener(
            'fullscreenchange',
            this.onFullscreenChange
        )
    },
})
</script>

<style>
#controls ::cue {
    background-color: transparent;
    font-family: Arial;
    /* text-shadow: 0px 0px rgba(0,0,0,0.75), 
                 0px 2px rgba(0,0,0,0.75), 
                 2px 0px rgba(0,0,0,0.75),
                 0px 0px rgba(0,0,0,0.75); */
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8),
        -1px -1px 1px rgba(0, 0, 0, 0.8), 1px -1px 1px rgba(0, 0, 0, 0.8),
        -1px 1px 1px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.8);
    -webkit-font-smoothing: subpixel-antialiased;
    margin-bottom: 100;
    position: relative;
}

#controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 85%;
    align-self: flex-end;
    justify-self: center;
    padding: 1.6em;
    flex: 1;
    font-size: 1.2em;
}
#controls .time {
    /* color: rgba(255, 255, 255, 0.3); */
    /* margin-right: 2em; */
    color: #fff;
    /* margin-left: 1.6em; */
    margin-left: 1.2em;
    margin-right: 1.2em;
    font-size: 0.8em;
    width: auto;
}
#controls .controls {
    display: flex;
    font-size: 1.2em;
    margin-right: 1.4em;
    position: relative;
}
#controls .controls:last-child {
    margin-right: 0;
}
#controls .controls button {
    border: 0;
    background-color: transparent;
    padding: 0;
    border: 0;
    font-size: 1em;
    color: #fff;
    cursor: pointer;
    outline: none;
}
#controls .controls .item {
    position: relative;
}
#controls .controls .item:not(:last-child) {
    margin-right: 1.2em;
}
#controls .controls .item.captions .list {
    position: absolute;
    left: 50%;
    top: 180%;
    transform: translate(-50%, -180%);
    font-size: 0.8em;
    background-color: rgba(255, 255, 255, 0.9);
    color: #353535;
    border-radius: 4px;
    /* text-align: center; */
    box-shadow: 0 15px 35px rgba(50, 50, 90, 0.1),
        0 5px 15px rgba(0, 0, 0, 0.07);
    font-family: Arial;
    /* font-weight: 300; */
    visibility: hidden;
    width: 90px;
    display: flex;
    flex-direction: column;
}
#controls .controls .item.captions .list .caption {
    padding: 0.45em;
    padding-left: 0.8em;
    padding-right: 0.8em;
    cursor: pointer;
}
#controls .controls .item.captions .list .caption.active {
    font-weight: bold;
}
#controls .controls .item.captions .list .caption:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}
#controls .right {
    display: flex;
    align-items: center;
}

#controls #volumeBtn {
    width: 21.59px;
    text-align: center;
}
</style>
