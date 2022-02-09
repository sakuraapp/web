<template v-if="src">
    <UserAvatar v-if="isUser" :user="this.item.data" :size="size" />
    <Avatar v-else :src="src" :size="size" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Notification, NotificationType, User } from '~/types'
import Avatar from '../Avatar.vue'
import UserAvatar from '../User/Avatar.vue'

export default defineComponent({
    components: {
        Avatar,
        UserAvatar,
    },
    props: {
        item: {
            type: Object as PropType<Notification<unknown>>,
            required: true,
        },
    },
    data() {
        return { size: 32 }
    },
    computed: {
        isUser(): boolean {
            return this.item.type === NotificationType.RoomJoinRequest
        },
        src(): string {
            switch (this.item.type) {
                case NotificationType.RoomJoinRequest: {
                    const user = this.item.data as User

                    return user.avatar
                }
            }

            return null
        },
    },
})
</script>

<style scoped>
.avatar {
    margin-right: 0.6em;
}
</style>
