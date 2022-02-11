<template>
    <div class="group">
        <div class="avatar">
            <UserAvatar :user="group.author" :size="40" />
        </div>
        <div class="body">
            <div class="author">
                {{ group.author.username }}
            </div>
            <div class="content">
                <div
                    v-for="message in group.messages"
                    :key="message.id"
                    :class="{ unsent: !message.id }"
                >
                    <MessageContent :content="message.content" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserAvatar from '../User/Avatar.vue'
import MessageContent from './MessageContent.vue'

export default defineComponent({
    components: {
        UserAvatar,
        MessageContent,
    },
    props: {
        group: Object,
    },
})
</script>

<style scoped>
.group {
    display: flex;
    padding: 0.6em;
    font-size: 0.8em;
}

.group .avatar {
    margin-right: 0.5em;
}

.group .name {
    color: lightgrey;
}
.group .content .unsent {
    color: rgb(160, 160, 160);
}
.group .content div {
    word-wrap: break-word;
    word-break: break-word;
    line-height: 1.375em;
    font-size: 1rem;
}
.group .content div .icon {
    height: 1.375em;
    width: 1.375em;
    display: inline-block;
    /* vertical-align: middle; */
    vertical-align: bottom;
    object-fit: contain;
}
</style>
