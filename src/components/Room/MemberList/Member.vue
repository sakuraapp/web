<template>
    <div class="member">
        <UserAvatar :user="member.user" :size="38" />
        <div class="name">
            {{ member.user.username }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import UserAvatar from '~/components/User/Avatar.vue'
import { RoomMemberInfo } from '~/types'

export default defineComponent({
    components: { UserAvatar },
    props: {
        member: {
            type: Object as PropType<RoomMemberInfo>,
            required: true,
        },
    },
})
</script>

<style scoped>
.member {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    padding: 0.5em;
}

.avatar {
    margin-right: 0.6em;
}

.name {
    color: rgb(240, 240, 240);
    /* flex-grow: 1; */
}

.user:not(:last-child) {
    border-bottom: 1px solid rgb(40, 40, 40);
}
</style>
