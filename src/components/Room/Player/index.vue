<template>
    <div class="player">
        <div class="overlay">
            <div
                class="content"
                @click="togglePlay"
                @dblclick="toggleFullscreen"
            >
                <Controls ref="controls" />
            </div>
        </div>
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Controls from './Controls.vue'

export default Vue.extend({
    components: {
        Controls,
    },
    methods: {
        togglePlay() {
            this.$refs.controls.togglePlay()
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
