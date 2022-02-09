<template>
    <div class="messages" ref="messages">
        <template
            v-for="(group, index) in messages"
            :key="`message-group-${index}`"
        >
            <MessageGroup :group="group" />
        </template>
    </div>
    <Input />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { Message, MessageGroup as Group } from '~/types'
import Input from './Input.vue'
import MessageGroup from './MessageGroup.vue'

export default defineComponent({
    components: { Input, MessageGroup },
    data() {
        return { unsubscribe: null }
    },
    computed: mapGetters({ messages: 'room/messages' }),
    methods: {
        onUpdateMessages(force = false) {
            const messages = this.$refs.messages as HTMLDivElement
            const diff =
                messages.scrollHeight -
                (messages.scrollTop + messages.clientHeight)

            if (force || diff < 200) {
                messages.scrollTop = messages.scrollHeight
            }
        },
    },
    mounted() {
        this.unsubscribe = this.$store.subscribe((mutation, state) => {
            const myUserId = state.session.userId

            let isOwnMessage = false

            switch (mutation.type) {
                case 'room/handleMessage':
                    {
                        const payload = mutation.payload as Message

                        isOwnMessage = payload.author === myUserId
                    }
                    break
                case 'room/handleMessageGroup':
                    {
                        const payload = mutation.payload as Group

                        isOwnMessage = payload.author === myUserId
                    }
                    break
                case 'room/handleMessageGroupMember':
                    {
                        const payload = mutation.payload as { group: number }
                        const group = state.room.messages[payload.group]

                        isOwnMessage = group.author === myUserId
                    }
                    break
                default:
                    return
            }

            this.$nextTick(() => this.onUpdateMessages(isOwnMessage))
        })
    },
    beforeUnmount() {
        this.unsubscribe()
    },
})
</script>

<style scoped>
.messages {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
</style>
