<template>
    <button class="leaveRoomBtn" @click="leaveRoom">
        <FontAwesomeIcon icon="arrow-left" />
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    methods: {
        leaveRoom() {
            this.$store.dispatch('leaveRoom')
        },
    },
})
</script>

<style scoped>
.leaveRoomBtn {
    position: absolute;
    top: 2.5%;
    left: 2%;
    background: transparent;
    color: grey;
    font-size: 2em;
    border: 0;
    cursor: pointer;
    outline: none;
}

.leaveRoomBtn:hover {
    color: lightgrey;
}
</style>
