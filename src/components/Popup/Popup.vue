<template>
    <div class="popup">
        <CloseButton v-if="!hideCloseButton" @click="close" />
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CloseButton from './CloseButton.vue'

export default defineComponent({
    components: { CloseButton },
    props: {
        hideCloseButton: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['close'],
    methods: {
        close() {
            this.$emit('close')
        },
    },
})
</script>

<style scoped>
.popup {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9991;
    width: 100%;
    height: 100%;
    background: rgba(25, 25, 25, 0.9);
}
</style>
