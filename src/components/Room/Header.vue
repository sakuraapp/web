<template>
    <div class="header">
        <div class="leaveBtn" @click="leaveRoom">
            <FontAwesomeIcon icon="arrow-left" />
        </div>
        <span>
            {{ info.name }}
        </span>
        <div class="right">
            <div class="buttons">
                <NotificationButton class="item" />
            </div>
            <Profile :user="user" minimal />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'
import Profile from '~/components/Profile.vue'
import NotificationButton from '~/components/Notification/Button.vue'

export default defineComponent({
    components: {
        NotificationButton,
        Profile,
    },
    computed: {
        ...mapState('room', ['info']),
        ...mapGetters({ user: 'session/user' }),
    },
    methods: {
        leaveRoom() {
            this.$store.dispatch('room/leaveRoom')
        },
    },
})
</script>

<style scoped>
.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2em;
    padding: 0.6em 0.8em;
    border-bottom: 1px solid rgb(60, 60, 60);
}

.leaveBtn {
    color: lightgray;
    cursor: pointer;
    transition: 300ms;
}

.leaveBtn:hover {
    color: #fff;
}

.right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.buttons {
    margin-right: 1.1em;
}

.buttons .item {
    font-size: 1.1em;
    position: relative;
}
</style>
