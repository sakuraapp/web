<template>
    <Avatar :src="user.avatar" :color="color" :size="size">
        <slot />
    </Avatar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { getAvatarColorIndex } from '~/helpers/avatar'
import { User } from '~/types'
import Avatar from '../Avatar.vue'

export default defineComponent({
    components: { Avatar },
    props: {
        user: {
            type: Object as PropType<User>,
            required: true,
        },
        size: Number,
    },
    computed: {
        color(): number {
            return getAvatarColorIndex(this.user.discriminator)
        },
    },
})
</script>
