<template>
    <ProgressBar
        class="volume"
        :progress="progress"
        @change="onChange"
        vertical
    />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import ProgressBar from '~/components/ProgressBar.vue'

export default Vue.extend({
    props: {
        visible: Boolean,
    },
    components: {
        ProgressBar,
    },
    computed: {
        progress() {
            return this.player.volume
        },
        ...mapState(['player']),
    },
    methods: {
        onChange(progress: number) {
            this.$emit('change', progress)
        },
    },
})
</script>

<style>
.progress.volume {
    position: absolute;
    top: -65px;
    height: 50px !important;
    left: 7px;
    visibility: hidden;
}
</style>
