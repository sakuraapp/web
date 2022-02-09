<template>
    <div class="group">
        <div class="avatar">
            <Avatar :src="group.author.avatar" :size="40" />
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
                    {{ message.content }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from '../Avatar.vue'

export default defineComponent({
    components: { Avatar },
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
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 0.7em;
    width: 40px;
    height: 40px;
}
.group .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
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
