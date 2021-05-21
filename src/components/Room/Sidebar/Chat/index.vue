<template>
    <div class="messages" ref="messages">
        <template
            v-for="(group, index) in messages"
            :key="`message-group-${index}`"
        >
            <Message :group="group" />
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Message from './Message.vue'

export default defineComponent({
    components: {
        Message,
    },
    computed: mapGetters(['messages']),
    methods: {
        updateMessages(force = false) {
            const $messages = this.$refs.messages
            const diff =
                $messages.scrollHeight -
                ($messages.scrollTop + $messages.clientHeight)

            if (force || diff < 200) {
                $messages.scrollTop = $messages.scrollHeight
            }
        },
    },
    mounted() {
        this.unsubscribe = this.$store.subscribe(
            (mutation: {
                type: string
                payload: {
                    author: string
                }
            }) => {
                if (mutation.type === 'addMessage') {
                    const isOwnMessage =
                        mutation.payload.author === this.$store.state.user.id

                    this.$nextTick(() => {
                        this.updateMessages(isOwnMessage)
                    })
                }
            }
        )
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
}
</style>
