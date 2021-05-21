<template>
    <div id="container" v-if="!isRootView">
        <div id="header" v-if="!room">
            <Logo />
            <Profile v-if="user" :user="user" />
        </div>
        <div id="body">
            <router-view id="view" />
        </div>
    </div>
    <router-view v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import Logo from './Logo.vue'
import Profile from './Profile.vue'
import { RouteRecord } from 'vue-router'

export default defineComponent({
    components: {
        Logo,
        Profile,
    },
    computed: {
        isRootView() {
            return this.$route.matched.some(
                (record: RouteRecord) => record.meta.isRootView
            )
        },
        ...mapState(['room', 'user', 'invitation']),
    },
})
</script>

<style>
#container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

#header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2em;
    /* border-bottom: 1px solid #292929; */
    /* border-bottom: 1px solid #212121; */
    border-bottom: 1px solid #444444;
}
#header .sakuraLogo {
    font-size: 1.8em;
}
#header .userProfile .info {
    display: none;
}

#body {
    flex-grow: 1;
    height: 100%;
    display: flex;
}

#view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 100%;
}
</style>
