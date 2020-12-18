<template>
    <div id="roomMenu">
        <div class="error" v-if="error">
            {{ error }}
        </div>
        <form @submit="joinRoom">
            <input
                v-model="roomId"
                type="text"
                placeholder="enter room code"
                :disabled="busy"
            />
            <button class="roomMenuButton" :disabled="busy">
                <div class="icon">
                    <FontAwesomeIcon icon="arrow-right" />
                </div>
                <span>Join</span>
            </button>
        </form>
        <div class="lineSeparator">Or</div>
        <button class="roomMenuButton" @click="createRoom" :disabled="busy">
            <div class="icon">
                <FontAwesomeIcon icon="plus" />
            </div>
            <span>Create a Room</span>
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            roomId: '',
            error: '',
            busy: false,
        }
    },
    methods: {
        joinRoom(e: Event) {
            this.error = ''

            e.preventDefault()

            if (this.busy || !this.roomId.length) return

            this.$store.dispatch('joinRoom', this.roomId)
        },

        createRoom() {
            this.error = ''

            if (this.busy) return

            this.busy = true
            this.$store.dispatch('createRoom', 1)
        },
    },
    mounted() {
        this.unsubscribe = this.$store.subscribe(
            (mutation: { type: string; payload: unknown }): void => {
                switch (mutation.type) {
                    case 'handleJoinRoom':
                        this.busy = false
                        break
                    case 'handlePrivateRoom':
                        this.error =
                            'Room is private. Waiting for host to accept your request to join the room...'
                        break
                    case 'handleRoomNotFound':
                        this.error = 'Room not found.'
                        this.busy = false
                        break
                }
            }
        )

        this.unsubscribeAction = this.$store.subscribeAction(
            (action: { type: string; payload: unknown }): void => {
                if (action.type === 'joinRoom') {
                    this.busy = true
                }
            }
        )
    },
    beforeDestroy() {
        this.unsubscribe()
        this.unsubscribeAction()
    },
})
</script>

<style>
#roomMenu,
#roomMenu form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#roomMenu {
    width: 33%;
    font-size: 1.6em;
}

#roomMenu .error {
    color: #dc3737;
    font-weight: bold;
    margin-bottom: 0.8em;
}

#roomMenu form {
    justify-content: center;
    width: 65%;
    margin-bottom: 1.4em;
}
#roomMenu form .roomMenuButton {
    width: 100%;
}

.roomMenuButton {
    background-color: #292929;
    padding: 1em 1.6em;
    width: 65%;
    font-size: 0.9em;
    font-weight: bold;
    font-family: Nunito;
    /* border: 2px solid #333333; */
    border: 0;
    color: #fff;
    border-radius: 50px;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: center;
    position: relative;
}
.roomMenuButton:not(:disabled):hover {
    background-color: #2e2e2e;
}
.roomMenuButton:disabled {
    color: grey;
}
.roomMenuButton .content {
    position: relative;
}
.roomMenuButton .icon {
    position: absolute;
    left: 30px;
}

#roomMenu input[type='text'] {
    background-color: transparent;
    color: #fff;
    padding: 0.4em;
    font-size: 1em;
    border: 0;
    border-bottom: 2px solid #666666;
    outline: none;
    text-align: center;
    width: 80%;
    margin-bottom: 1.2em;
    font-family: Nunito;
}

.lineSeparator {
    display: flex;
    align-items: center;
    text-align: center;
    width: 40%;
    font-size: 1.2em;
    text-transform: uppercase;
    margin-bottom: 1.2em;
}
.lineSeparator::before,
.lineSeparator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #4b4b4b;
}
.lineSeparator::before {
    margin-right: 0.25em;
}
.lineSeparator::after {
    margin-left: 0.25em;
}
</style>
