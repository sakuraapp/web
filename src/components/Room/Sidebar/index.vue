<template>
    <div class="sidebar">
        <div class="header">
            <Profile :user="myUser" />
            <div class="inviteBtn" @click="invitePopup = true">
                <FontAwesomeIcon icon="link" />
                Invite
            </div>
        </div>
        <div class="subHeader">
            <div :class="{ active: tab === 'chat' }" @click="setTab('chat')">
                <FontAwesomeIcon icon="comments" />
                <span>Chat</span>
            </div>
            <div :class="{ active: tab === 'queue' }" @click="setTab('queue')">
                <FontAwesomeIcon icon="list" />
                <span>Queue</span>
            </div>
        </div>
        <InvitePopup @close="invitePopup = false" v-if="invitePopup" />
        <Chat v-if="tab === 'chat'" />
        <Queue @queueAddClick="addToQueue" v-else-if="tab === 'queue'" />
        <ChatInput v-if="tab === 'chat'" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Profile from '../../Profile.vue'
import InvitePopup from './InvitePopup.vue'
import Chat from './Chat/index.vue'
import ChatInput from './Chat/Input.vue'
import Queue from './Queue/index.vue'

export default Vue.extend({
    components: {
        Profile,
        InvitePopup,
        Chat,
        Queue,
        ChatInput,
    },
    data() {
        return {
            tab: 'chat',
            invitePopup: false,
        }
    },
    computed: mapState({ myUser: 'user' }),
    methods: {
        setTab(name: string) {
            this.tab = name
        },
        addToQueue() {
            this.$emit('queueAddClick')
        },
    },
})
</script>

<style scoped>
.sidebar {
    width: 23.3%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #171717;
    font-size: 1.6em;
    background-color: rgba(35, 35, 35, 1);
}
.sidebar .header {
    background-color: #262626;
    padding: 0.7em;
    font-size: 0.9em;
    font-weight: 600;
    border-bottom: 1px solid #171717;
    color: #facdee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sidebar .header svg {
    margin-right: 0.1em;
    vertical-align: middle;
    /* font-size: 0.8em; */
}
.sidebar .inviteBtn {
    cursor: pointer;
}
.sidebar .subHeader {
    background-color: #303030;
    font-size: 0.8em;
    text-align: center;
    text-transform: uppercase;
    /* font-weight: bold; */
    /* font-family: Roboto; */
    display: flex;
    justify-content: center;
    color: lightgrey;
    border-bottom: 1px solid rgb(40, 40, 40);
}
.sidebar .subHeader div {
    padding: 0.6em;
    flex: 1;
    cursor: pointer;
}
.sidebar .subHeader div.active {
    color: #fff;
    font-weight: bold;
}
.sidebar .subHeader div:not(:last-child) {
    border-right: 1px solid #404040;
    padding-right: 0.4em;
}
.sidebar .subHeader div:last-child {
    padding-left: 0.4em;
}
.sidebar .subHeader div i,
.sidebar .subHeader div svg {
    margin-right: 0.5em;
}
</style>
