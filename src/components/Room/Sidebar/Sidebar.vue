<template>
    <div class="sidebar">
        <div class="head">
            <div class="tabs">
                <div
                    :class="{ active: tab === 'chat' }"
                    @click="setTab('chat')"
                >
                    <FontAwesomeIcon icon="comments" />
                </div>
                <div
                    :class="{ active: tab === 'queue' }"
                    @click="setTab('queue')"
                >
                    <FontAwesomeIcon icon="list-ol" />
                </div>
                <div
                    :class="{ active: tab === 'settings' }"
                    @click="setTab('settings')"
                    v-if="hasPermission('MANAGE_ROOM')"
                >
                    <FontAwesomeIcon icon="cog" />
                </div>
                <div
                    :class="{ active: tab === 'members' }"
                    @click="setTab('members')"
                    v-else
                >
                    <FontAwesomeIcon icon="users" />
                </div>
            </div>
        </div>
        <div class="body">
            <Chat v-if="tab === 'chat'" />
            <Queue v-else-if="tab === 'queue'" />
            <Settings v-else-if="tab === 'settings'" />
            <MemberListTab v-else-if="tab === 'members'" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Chat from '~/components/Chat/Chat.vue'
import Queue from '~/components/Queue/Queue.vue'
import Settings from '~/components/Room/Settings/Settings.vue'
import MemberListTab from '~/components/Room/MemberList/Tab.vue'

export default defineComponent({
    components: {
        Chat,
        Queue,
        Settings,
        MemberListTab,
    },
    data() {
        return { tab: 'chat' }
    },
    methods: {
        setTab(name: string) {
            this.tab = name
        },
    },
})
</script>

<style scoped>
.sidebar {
    background: rgb(25, 25, 25);
    border-left: 1px solid rgb(60, 60, 60);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 22%;
}

.sidebar .tabs {
    display: flex;
    /* padding: 0.3em; */
    border-bottom: 1px solid rgb(43, 43, 43);
}

.sidebar .tabs div {
    text-align: center;
    background: rgb(33, 33, 33);
    padding: 0.6em;
    flex-grow: 1;
    font-family: Nunito;
    color: rgb(210, 210, 210);
    cursor: pointer;
    transition: 300ms;
}
/* .sidebar .tabs div:not(:last-child) {
    margin-right: 0.1em;
} */
.sidebar .tabs div:hover {
    color: rgb(240, 240, 240);
}
.sidebar .tabs div.active {
    color: #fff;
    font-weight: bold;
}

.sidebar .body {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    overflow-y: auto;
}
</style>
