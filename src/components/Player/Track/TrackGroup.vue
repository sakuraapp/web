<template>
    <div class="group">
        <div
            :class="{ track: true, active: isActive(track) }"
            v-for="track in tracks"
            :key="track.id"
            @click="selectTrack(track)"
        >
            {{ track.label }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Track } from '~/types'

export default defineComponent({
    props: {
        active: {
            type: [Number, String],
            required: true,
        },
        tracks: {
            type: Object as PropType<Track>,
            required: true,
        },
    },
    emits: ['change'],
    methods: {
        isActive(track: Track): boolean {
            return track.id === this.active
        },
        selectTrack(track: Track): void {
            this.$emit('change', track)
        },
    },
})
</script>

<style scoped>
.group {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    overflow-y: auto;
}

.track {
    font-size: 0.8em;
    cursor: pointer;
    color: rgb(170, 170, 170);
}
.track:not(:last-child) {
    margin-bottom: 0.8em;
}
.track.active {
    color: #fff;
    /* font-weight: bold; */
}
</style>
