<template>
    <ProgressBar :progress="progress" @hover="onHover" @change="onChange" />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { formatSeconds } from 'helpers/util'
import ProgressBar from '~/components/ProgressBar.vue'

export default Vue.extend({
    components: {
        ProgressBar,
    },
    computed: {
        progress() {
            return this.player.currentTime / this.player.duration
        },
        ...mapState(['player']),
    },
    methods: {
        onHover(progress: number, setText: (text: string) => void) {
            setText(formatSeconds(progress * this.player.duration))
        },
        onChange(progress: number) {
            this.$store.dispatch('seek', progress * this.player.duration)
        },
    },
})
</script>
