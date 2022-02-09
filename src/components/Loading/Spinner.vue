<template>
    <div class="spinner" :style="style"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatSize, formatTime } from '~/helpers/css'

export default defineComponent({
    props: {
        size: {
            type: [Number, String],
            default: '1.25em',
        },
        thickness: {
            type: [Number, String],
            default: '.15em',
        },
        backgroundColor: {
            type: String,
            default: 'transparent',
        },
        foregroundColor: {
            type: String,
            default: '#ffffff',
        },
        duration: {
            type: [Number, String],
            default: '.75s',
        },
    },
    computed: {
        style(): Record<string, string> {
            const size = formatSize(this.size)
            const thickness = formatSize(this.thickness)
            const time = formatTime(this.duration)

            return {
                borderStyle: 'solid',
                borderWidth: thickness,
                borderColor: this.foregroundColor,
                borderRightColor: this.backgroundColor,
                width: size,
                height: size,
                animationDuration: time,
            }
        },
    },
})
</script>

<style scoped>
.spinner {
    border-radius: 50%;
    animation: spin 2s linear infinite;
    vertical-align: text-bottom;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
