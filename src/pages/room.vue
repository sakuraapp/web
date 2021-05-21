<template>
    <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return { room: null }
    },
    mounted() {
        this.$router.push({ name: 'app' })
        this.$store.dispatch('handleJoinRoomRequest', {
            id: this.$route.params.id,
        })
    },
})
</script>
