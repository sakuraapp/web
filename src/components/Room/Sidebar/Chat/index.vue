<template>
    <div class="messages" ref="messages">
        <template v-for="(group, index) in messages">
            <Message :group="group" :key="`message-group-${index}`" />
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Message from './Message.vue'

export default Vue.extend({
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
    beforeDestroy() {
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
