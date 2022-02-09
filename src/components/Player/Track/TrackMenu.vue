<template>
    <div class="menu">
        <div class="section" v-if="player.textTracks.length > 0">
            <h4>Captions</h4>
            <TrackGroup
                :active="player.activeTextTrack"
                :tracks="player.textTracks"
                @change="setTextTrack"
            />
        </div>
        <div class="section" v-if="player.audioTracks.length > 0">
            <h4>Audio</h4>
            <TrackGroup
                :active="player.activeAudioTrack"
                :tracks="player.audioTracks"
                @change="setAudioTrack"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Track } from '~/types'
import TrackGroup from './TrackGroup.vue'

export default defineComponent({
    components: { TrackGroup },
    computed: mapState(['player']),
    methods: {
        setTextTrack(track: Track): void {
            this.$store.dispatch('player/setTextTrack', track.id)
        },
        setAudioTrack(track: Track): void {
            this.$store.dispatch('player/setAudioTrack', track.id)
        },
    },
})
</script>

<style scoped>
.menu {
    position: absolute;
    left: 60%;
    top: -90%;
    transform: translate(-60%, -90%);
    background: rgb(60, 60, 60);
    font-size: 0.7em;
    border-radius: 8px;
    padding: 1em 0;
    display: flex;
    z-index: 9997;
    max-height: 30vh;
}

.section {
    padding: 0 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}

.section:not(:last-child) {
    border-right: 1px solid grey;
}

h4 {
    margin-top: 0;
    margin-bottom: 0.8em;
}
</style>
