<template>
    <div
        class="overlay"
        :style="{ opacity: Number(active) }"
        @mousemove="activate"
    >
        <div
            class="content"
            ref="content"
            @click="togglePlay"
            @dblclick="toggleFullscreen"
        >
            <Controls @activate="activate" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { toggleFullscreen } from '~/helpers/util'
import Controls from './Controls.vue'

const ACTIVITY_TIMEOUT = 3000

export default defineComponent({
    components: { Controls },
    data() {
        return {
            active: true,
            activityTimer: null,
        }
    },
    computed: {
        ...mapState('player', ['playing']),
    },
    methods: {
        togglePlay(e: MouseEvent) {
            if (e.composedPath()[0] === this.$refs.content) {
                this.$store.dispatch('player/togglePlaying')
            }
        },
        toggleFullscreen(e: MouseEvent) {
            if (e.composedPath()[0] === this.$refs.content) {
                toggleFullscreen()
            }
        },
        stopActivityTimer() {
            if (this.activityTimer) {
                clearTimeout(this.activityTimer)

                this.activityTimer = null
            }
        },
        resetActivityTimer() {
            this.stopActivityTimer()
            this.activityTimer = setTimeout(
                () => (this.active = false),
                ACTIVITY_TIMEOUT
            )
        },
        activate() {
            this.active = true

            if (this.playing) {
                this.resetActivityTimer()
            } else {
                this.stopActivityTimer()
            }
        },
    },
    watch: {
        playing() {
            this.activate()
        },
    },
    mounted() {
        this.activate()
    },
})
</script>

<style scoped>
.overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9990;
}

.content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
}
</style>
