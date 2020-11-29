<template>
    <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
