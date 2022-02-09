<template>
    <ProgressBar :progress="progress" @hover="onHover" @change="onChange" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { formatSeconds } from 'helpers/util'
import ProgressBar from '~/components/ProgressBar.vue'
import { MappedState, PlayerState } from '~/store/types'

export default defineComponent({
    components: {
        ProgressBar,
    },
    computed: {
        progress(): number {
            return this.player.currentTime / this.player.duration
        },
        ...(mapState(['player']) as MappedState<'player', PlayerState>),
    },
    methods: {
        onHover(progress: number, setText: (text: string) => void) {
            setText(formatSeconds(progress * this.player.duration))
        },
        onChange(progress: number) {
            this.$store.dispatch('player/seek', progress * this.player.duration)
        },
    },
})
</script>
