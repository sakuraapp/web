<template>
    <div class="room">
        <Header />
        <div class="body" id="roomBody">
            <Player />
            <Sidebar />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '~/components/Room/Header.vue'
import Sidebar from '~/components/Room/Sidebar/Sidebar.vue'
import Player from '~/components/Player/Player.vue'

export default defineComponent({
    components: {
        Header,
        Player,
        Sidebar,
    },
})
</script>

<style scoped>
.room {
    height: 100%;
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgb(20, 20, 20);
}

.body {
    flex-grow: 1;
    display: flex;
    overflow-y: auto;
    position: relative;
}
</style>
