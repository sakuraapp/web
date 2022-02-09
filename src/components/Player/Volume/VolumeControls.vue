<template>
    <div class="item">
        <VolumeIndicator
            ref="indicator"
            v-visible="showIndicator"
            @change="setVolume"
        />
        <button @click="onBtnClick">
            <FontAwesomeIcon
                :icon="icon"
                @mouseover="onBtnHover"
                @mouseout="onBtnHoverEnd"
            />
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { isMouseNear } from 'helpers/util'
import VolumeIndicator from './VolumeIndicator.vue'

export default defineComponent({
    components: {
        VolumeIndicator,
    },
    data() {
        return {
            btnHovered: false,
            showIndicator: false,
            lastVolume: null,
        }
    },
    computed: {
        volume(): number {
            return this.player.volume
        },
        icon() {
            if (this.volume === 0) {
                return 'volume-mute'
            } else if (this.volume < 0.6) {
                return 'volume-down'
            } else {
                return 'volume-up'
            }
        },
        ...mapState(['player']),
    },
    methods: {
        setVolume(vol: number) {
            this.lastVolume = this.volume
            this.$store.dispatch('player/setVolume', vol)
        },
        onBtnClick() {
            this.setVolume(this.volume === 0 ? this.lastVolume || 1 : 0)
        },
        onBtnHover() {
            this.showIndicator = true
            this.btnHovered = true

            window.addEventListener('mousemove', this.onMouseMove)
        },
        onBtnHoverEnd() {
            this.btnHovered = false
        },
        onMouseMove(e: MouseEvent) {
            const ref = this.$refs.indicator as { $el: HTMLElement }
            const el = ref.$el

            this.showIndicator = this.btnHovered || isMouseNear(el, 18, e)

            if (!this.showIndicator) {
                this.onHideIndicator()
            }
        },
        onHideIndicator() {
            window.removeEventListener('mousemove', this.onMouseMove)
        },
    },
    beforeUnmount() {
        this.onHideIndicator()
    },
})
</script>

<style scoped>
.item {
    width: 21.59px;
    text-align: center;
}
</style>
