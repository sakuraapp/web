<template>
    <div v-if="ready">
        <InviteView
            :room="invitation.room"
            @close="hideInvite"
            v-if="invitation"
        />
        <RoomMenu v-else-if="!room" />
        <Room v-else />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import RoomMenu from '~/components/RoomMenu.vue'
import Room from '~/components/Room/index.vue'
import InviteView from '~/components/InviteView.vue'

export default Vue.extend({
    components: {
        RoomMenu,
        Room,
        InviteView,
    },
    computed: mapState(['ready', 'room', 'user', 'invitation']),
    methods: {
        hideInvite() {
            this.$store.commit('cancelRoomInvitation')
        },
    },
})
</script>
