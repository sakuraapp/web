<template>
    <div class="message">
        <div class="avatar">
            <img :src="group.author.avatar" />
        </div>
        <div class="body">
            <div class="name">
                {{group.author.username}}
            </div>
            <div class="content">
                <div
                    v-for="message in group.messages"
                    :key="message.id"
                    :class="{ unsent: !message.id }"
                >
                    {{message.content}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: ['group']
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
</style>