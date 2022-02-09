<template>
    <div class="input">
        <textarea
            @keydown="onKeyDown"
            v-model="message"
            rows="1"
            placeholder="Type a message"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return { message: '' }
    },
    methods: {
        onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Enter') {
                if (!e.shiftKey) {
                    e.preventDefault()

                    this.send()
                }
            }
        },
        send() {
            const { message } = this

            if (message.length > 0) {
                this.message = ''
                this.$store.dispatch('room/sendMessage', message)
            }
        },
    },
})
</script>

<style lang="css" scoped>
.input {
    display: flex;
    /* background: rgb(50, 50, 50); */
    border-top: 1px solid rgb(50, 50, 50);
}

textarea {
    background: transparent;
    border: 0;
    padding: 0.6em;
    font-size: 1em;
    outline: none;
    color: #fff;
    resize: none;
    flex-grow: 1;
    font-family: inherit;
}
</style>
