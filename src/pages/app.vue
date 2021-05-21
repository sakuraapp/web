<template>
    <div>
        <template v-if="connected">
            <InviteView
                :room="invitation.room"
                @close="hideInvite"
                v-if="invitation"
            />
            <RoomMenu v-else-if="!room" />
        </template>
        <Room v-else />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import RoomMenu from '~/components/RoomMenu.vue'
import Room from '~/components/Room/index.vue'
import InviteView from '~/components/InviteView.vue'

export default defineComponent({
    components: {
        RoomMenu,
        Room,
        InviteView,
    },
    computed: mapState(['ready', 'connected', 'room', 'user', 'invitation']),
    methods: {
        hideInvite() {
            this.$store.commit('cancelRoomInvitation')
        },
    },
})
</script>
