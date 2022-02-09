<template>
    {{ value }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        character: {
            type: String,
            default: '.',
        },
        count: {
            type: [Number, String],
            default: 3,
        },
        rate: {
            type: [Number, String],
            default: 500,
        },
    },
    data() {
        return {
            interval: 0,
            value: '',
        }
    },
    methods: {
        start() {
            this.interval = window.setInterval(this.tick, Number(this.rate))
        },
        stop() {
            clearInterval(this.interval)

            this.interval = 0
            this.value = ''
        },
        tick() {
            if (this.value.length < Number(this.count)) {
                this.value += this.character
            } else {
                this.value = ''
            }
        },
    },
    mounted() {
        this.start()
    },
    beforeUnmount() {
        this.stop()
    },
})
</script>
