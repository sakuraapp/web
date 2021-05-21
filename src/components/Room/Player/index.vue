<template>
    <div class="player">
        <div class="overlay">
            <div
                class="content"
                ref="content"
                @click="togglePlay"
                @dblclick="toggleFullscreen"
            >
                <LeaveRoomBtn />
                <Controls ref="controls" />
            </div>
        </div>
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Controls from './Controls.vue'
import LeaveRoomBtn from '../LeaveRoomBtn.vue'

export default defineComponent({
    components: {
        Controls,
        LeaveRoomBtn,
    },
    methods: {
        togglePlay(e: MouseEvent) {
            if (e.target === this.$refs.content) {
                this.$refs.controls.togglePlay()
            }
        },
        toggleFullscreen() {
            this.$refs.controls.toggleFullscreen()
        },
    },
})
</script>

<style scoped>
.player {
    flex-grow: 1;
    position: relative;
    display: flex;
    background-color: #000;
}

.overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
}

.overlay .content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
}
</style>
