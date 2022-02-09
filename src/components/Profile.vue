<template>
    <div
        id="profile"
        :class="{ userProfile: true, right: alignRight }"
        :style="style"
    >
        <UserAvatar :user="user" :size="avatarSize" />
        <div :class="{ info: true, horizontal }" v-if="!minimal">
            <div class="username">{{ user.username }}</div>
            <div class="discriminator" v-if="!hideDiscriminator">
                #{{ user.discriminator }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { getAvatarColorIndex } from '~/helpers/avatar'
import { formatSize } from '~/helpers/css'
import { User } from '~/types'
import UserAvatar from './User/Avatar.vue'

export default defineComponent({
    components: { UserAvatar },
    props: {
        user: {
            type: Object as PropType<User>,
            required: true,
        },
        alignRight: Boolean,
        minimal: Boolean,
        hideDiscriminator: Boolean,
        horizontal: Boolean,
        fontSize: {
            type: [String, Number],
        },
        avatarSize: {
            type: Number,
            default: 36,
        },
    },
    computed: {
        style(): Record<string, string | number> {
            return {
                fontSize: this.fontSize ? formatSize(this.fontSize) : undefined,
            }
        },
        color(): number {
            return getAvatarColorIndex(this.user.discriminator)
        },
        avatarStyle(): Record<string, string> {
            const size = formatSize(this.avatarSize)

            return {
                backgroundImage: `url('${this.user.avatar}')`,
                width: size,
                height: size,
            }
        },
    },
})
</script>

<style>
.userProfile {
    display: flex;
    /* font-size: 1.2em; */
    align-items: center;
}
.userProfile.right {
    flex-direction: row-reverse;
    text-align: right;
}

.userProfile .avatar {
    margin-right: 0.5em;
}
.userProfile.right .avatar {
    margin-right: 0;
    margin-left: 0.5em;
}

.userProfile .info {
    display: flex;
    flex-direction: column;
}
.userProfile .info.horizontal {
    flex-direction: row;
    align-items: center;
}

.userProfile .discriminator {
    font-size: 0.6em;
    color: lightgrey;
}
.userProfile .info.horizontal .discriminator {
    margin-left: 0.1em;
    font-size: 1em;
}
</style>
