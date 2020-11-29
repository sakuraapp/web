<template>
    <div class="input">
        <form @submit="sendMessage">
            <div class="box">
                <input
                    type="text"
                    placeholder="Type a message"
                    v-model="message"
                />
                <!-- <div
                    contenteditable="true"
                    role="textbox"
                    spellcheck="true"
                ></div>
                <button @click="showEmojiPicker">
                    <Emoji :content="emoji.emoji" />
                </button> -->
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import emoji from '~/helpers/emoji'
import Emoji from '~/components/Emoji'

export default Vue.extend({
    components: {
        Emoji,
    },
    data() {
        return { message: '' }
    },
    computed: {
        emoji() {
            return emoji.random()
        },
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
        //showEmojiPicker() {},
    },
})
</script>

<style scoped>
.input {
    height: 9%;
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
.input .box {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    border: 0;
    padding: 0.6em 0.8em 0.6em 0.8em;
    font-size: 0.8em;
    width: 100%;
    display: flex;
}
.input .box input[type='text'],
.input .box button {
    background: transparent;
    padding: 0;
    margin: 0;
    border: 0;
    font-size: inherit;
    font-family: inherit;
    color: #fff;
    outline: none;
}
.input .box input[type='text'] {
    flex-grow: 1;
}
.input .box .emoji {
    height: 24px;
    width: 24px;
    margin-left: 0.4em;
}
</style>
