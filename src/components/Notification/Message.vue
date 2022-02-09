<template>
    <div class="container">
        <div class="message">
            {{ message }}
        </div>
        <div class="buttons" v-if="buttons">
            <div
                class="button"
                v-for="(button, i) in buttons"
                :key="i"
                :style="button.style"
                @click="button.onClick"
            >
                <FontAwesomeIcon :icon="button.icon" v-if="button.icon" />
                <span v-else>{{ button.label }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue'
import { Notification, NotificationType, User } from '~/types'

interface Button {
    icon?: string | string[]
    label?: string
    style?: Partial<CSSProperties>
    onClick?: (e: MouseEvent) => void
}

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<Notification<unknown>>,
            required: true,
        },
    },
    computed: {
        isRoomJoinRequest(): boolean {
            return this.item.type === NotificationType.RoomJoinRequest
        },
        message(): string {
            switch (this.item.type) {
                case NotificationType.RoomJoinRequest: {
                    const user = this.item.data as User

                    return `${user.username} is requesting to join your room.`
                }
            }

            return null
        },
        buttons(): Button[] {
            let buttons: Button[]

            switch (this.item.type) {
                case NotificationType.RoomJoinRequest:
                    buttons = [
                        {
                            label: '✓',
                            style: { color: '#70C56B' },
                            onClick: this.acceptRoomJoinRequest,
                        },
                        {
                            label: '×',
                            style: { color: '#C56B6C', fontSize: '1.1em' },
                            onClick: this.declineRoomJoinRequest,
                        },
                    ]
            }

            return buttons
        },
    },
    methods: {
        close() {
            this.$store.commit('session/handleRemoveNotification', this.item.id)
        },
        acceptRoomJoinRequest() {
            const user = this.item.data as User

            this.$store.dispatch('room/acceptRoomJoinRequest', user.id)
            this.close()
        },
        declineRoomJoinRequest() {
            this.close()
        },
    },
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.message {
    font-size: 0.9em;
}

.buttons {
    margin-top: 0.4em;
    display: flex;
}

.buttons .button {
    background: rgb(40, 40, 40);
    border: 1px solid rgb(90, 90, 90);
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
}

.buttons .button:not(:last-child) {
    margin-right: 0.2em;
}
</style>
