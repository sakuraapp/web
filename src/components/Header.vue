<template>
    <div class="header">
        <div class="left">
            <router-link to="/app">
                <Logo size="30" />
            </router-link>
        </div>
        <div class="center">
            <SearchBar />
        </div>
        <div class="right">
            <div class="buttons">
                <NotificationButton class="item" />
            </div>
            <Profile :user="user" minimal :avatarSize="52" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from './Logo.vue'
import SearchBar from './SearchBar.vue'
import Profile from './Profile.vue'
import NotificationButton from './Notification/Button.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
    components: {
        Logo,
        SearchBar,
        Profile,
        NotificationButton,
    },
    computed: mapGetters({ user: 'session/user' }),
})
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left,
.right {
    width: 23.5%;
    display: flex;
    align-items: center;
}

.left .sakuraLogo {
    flex-grow: 1;
    justify-content: flex-start;
}

.right {
    justify-content: flex-end;
}

.center {
    flex-grow: 1;
}

.buttons {
    margin-right: 1.4em;
}

.buttons .item {
    font-size: 1.3em;
    position: relative;
}
</style>
