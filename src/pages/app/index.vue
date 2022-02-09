<template>
    <AppLayout>
        <div class="header">
            <h2>Rooms</h2>
            <button @click="createRoom">
                Create Room
            </button>
        </div>
        <div class="rooms">
            <template v-if="rooms.length > 0">
                <router-link
                    v-for="room in rooms"
                    :key="room.id"
                    :to="`/room/${room.id}`"
                >
                    <RoomCard :room="room" />
                </router-link>
            </template>
            <div v-else>
                No public rooms found.
            </div>
        </div>
    </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RoomCard from '~/components/RoomCard.vue'
import AppLayout from '~/layouts/AppLayout.vue'

export default defineComponent({
    components: {
        RoomCard,
        AppLayout,
    },
    data() {
        return {
            busy: false,
            rooms: [],
        }
    },
    methods: {
        async createRoom() {
            if (this.busy) {
                return
            }

            this.busy = true

            await this.$store.dispatch('room/createRoom')

            this.busy = false
        },
    },
    async created() {
        const { data } = await this.axios.get('/rooms/latest')

        this.rooms = data.rooms
    },
})
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
}

h2 {
    margin-bottom: 0;
}

button {
    border: 0;
    border-radius: 5px;
    background: #956c9f;
    color: #fff;
    font-size: 0.9em;
    padding: 0.6em 1.3em;
    cursor: pointer;
    transition: 300ms;
}

button:hover {
    background: #794e83;
}

.card:not(:last-child) {
    margin-bottom: 0.8em;
}

/* ::v-deep(.center) {
    position: relative;
}

::v-deep(.center:before) {
    content: '';
    background: url('~/assets/gaming-pattern-dark-1.png');
    position: absolute;
    flex: 1;
    flex-grow: 1;
    top: 3%;
    left: 50%;
    transform: translateX(-50%);
    width: 107%;
    height: 102%;
    z-index: -1;
} */
</style>
