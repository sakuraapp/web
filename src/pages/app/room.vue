<template>
    <RoomLayout v-if="showRoom" />
    <div class="loading" v-else>
        <div class="message">
            <Spinner />
            <span v-if="isJoining">Joining Room...</span>
            <span v-else>Leaving Room...</span>
        </div>
        <button class="cancelBtn" v-if="isJoining">
            <span class="icon">
                X
            </span>
            <span>Cancel</span>
        </button>
    </div>
</template>

<script lang="ts">
import { RoomId } from '@sakuraapp/common'
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import Spinner from '~/components/Loading/Spinner.vue'
import RoomLayout from '~/layouts/RoomLayout.vue'
import { RoomStatus } from '~/types'

export default defineComponent({
    components: {
        RoomLayout,
        Spinner,
    },
    computed: {
        ...mapState(['room']),
        roomId(): RoomId {
            const id = this.$route.params.id as string

            return Number(id)
        },
        roomStatus(): RoomStatus {
            return this.$store.state.session.roomStatus
        },
        showRoom(): boolean {
            return this.roomStatus === RoomStatus.Joined
        },
        isJoining(): boolean {
            return this.roomStatus === RoomStatus.Joining
        },
    },
    mounted() {
        if (this.roomId !== this.room.info?.id) {
            this.$store.dispatch('room/joinRoom', this.roomId)
        }
    },
})
</script>

<style scoped>
.loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    font-size: 1.6em;
    font-weight: 300;
}

.loading .message {
    display: flex;
}

.loading .spinner {
    margin-right: 1.25em;
}

.cancelBtn {
    background: rgb(60, 60, 60);
    color: inherit;
    /* color: #e9b1cd; */
    font: inherit;
    font-size: 0.6em;
    padding: 0.6em;
    min-width: 12%;
    border: 3px solid rgb(60, 60, 60);
    border-radius: 25px;
    margin-top: 2.5em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 300ms;
}

.cancelBtn:hover {
    background: transparent;
}

.cancelBtn * {
    vertical-align: middle;
}

.cancelBtn .icon {
    /* font-size: 0.8em; */
    margin-right: 0.8em;
}
</style>
