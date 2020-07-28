<template>
    <div class="input">
        <form @submit="sendMessage">
            <input type="text" placeholder="Type a message" v-model="message" />
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
        return { message: '' }
    },
    methods: {
        sendMessage(e: Event) {
            e.preventDefault()

            if (this.message.length === 0) {
                return
            }

            this.$store.dispatch('submitMessage', this.message)
            this.message = ''
        },
    }
})
</script>

<style scoped>
.input {
    height: 8%;
    padding: 0.3em;
    background-color: rgba(255, 255, 255, 0.05);
    border-top: 1px solid #171717;
}
.input form {
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.input input[type='text'] {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    border: 0;
    padding: 0.6em 0.8em 0.6em 0.8em;
    font-size: 0.8em;
    outline: none;
    width: 100%;
    color: #fff;
    font-family: inherit;
}
</style>