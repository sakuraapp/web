<template>
    <div class="container">
        <div id="header" v-if="!room">
            <Logo />
            <Profile :user=myUser />
        </div>
        <div id="body">
            <InviteView :room="invitation.room" @close="hideInvite" v-if="invitation" />
            <RoomMenu v-else-if="!room" />
            <Room v-else />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Logo from './Logo.vue'
import Profile from './Profile.vue'
import RoomMenu from './RoomMenu.vue'
import Room from './Room/index.vue'
import InviteView from './InviteView.vue'

export default Vue.extend({
    components: {
        Logo,
        Profile,
        RoomMenu,
        Room,
        InviteView
    },
    data() {
        return {
            myUser: this.$store.state.user,
        }
    },
    computed: mapState(['room', 'invitation']),
    methods: {
        hideInvite() {
            this.$store.commit('cancelRoomInvitation')
        }
    }
})
</script>

<style>
.container {
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
    justify-content: center;
    align-items: center;
}
</style>