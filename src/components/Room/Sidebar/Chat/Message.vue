<template>
    <div class="message">
        <div class="avatar">
            <img :src="group.author.avatar" />
        </div>
        <div class="body">
            <div class="name">
                {{ group.author.username }}
            </div>
            <div class="content" ref="content">
                <div
                    v-for="message in group.messages"
                    :key="message.id"
                    :class="{ unsent: !message.id }"
                >
                    {{ emojifyText(message.content) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import emoji, { emojify } from '~/helpers/emoji'

export default defineComponent({
    props: ['group'],
    methods: {
        emojifyText(text: string): string {
            return emoji.emojify(text)
        },
        emojify() {
            emojify(this.$refs.content, {
                attributes: () => {
                    return { [`${this.$options._scopeId}`]: '' }
                },
            })
        },
    },
    mounted() {
        this.emojify()
    },
    updated() {
        this.emojify()
    },
})
</script>

<style scoped>
.message {
    display: flex;
    padding: 0.6em;
    font-size: 0.8em;
}
.message .avatar {
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 0.7em;
    width: 40px;
    height: 40px;
}
.message .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.message .name {
    color: lightgrey;
}
.message .content .unsent {
    color: rgb(160, 160, 160);
}
.message .content div {
    word-wrap: break-word;
    word-break: break-word;
    line-height: 1.375em;
    font-size: 1rem;
}
.message .content div .icon {
    height: 1.375em;
    width: 1.375em;
    display: inline-block;
    /* vertical-align: middle; */
    vertical-align: bottom;
    object-fit: contain;
}
</style>
