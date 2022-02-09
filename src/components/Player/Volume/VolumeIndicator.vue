<template>
    <ProgressBar
        @change="onChange"
        class="volume"
        :progress="progress"
        vertical
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import ProgressBar from '~/components/ProgressBar.vue'
import { MappedState, PlayerState } from '~/store/types'

export default defineComponent({
    components: {
        ProgressBar,
    },
    props: {
        visible: Boolean,
    },
    emits: ['change'],
    computed: {
        progress(): number {
            return this.player.volume
        },
        ...(mapState(['player']) as MappedState<'player', PlayerState>),
    },
    methods: {
        onChange(value: number) {
            this.$emit('change', value)
        },
    },
})
</script>

<style>
.progress.volume {
    position: absolute;
    top: -65px;
    height: 50px !important;
    left: -7px;
    left: 50%;
    transform: translateX(-50%);
    visibility: hidden;
}
</style>
