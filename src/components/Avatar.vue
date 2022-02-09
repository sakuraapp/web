<template>
    <div :class="{ avatar: true, default: !src }" :style="avatarStyle">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatSize } from '~/helpers/css'
import { getAvatarColor } from '~/helpers/avatar'

export default defineComponent({
    props: {
        src: {
            type: [String, File],
            required: false,
        },
        size: {
            type: Number,
            default: 36,
        },
        color: Number,
    },
    computed: {
        avatarStyle(): Record<string, string> {
            const size = formatSize(this.size)

            let color: string
            let src: string

            if (this.src) {
                if (this.src instanceof File) {
                    src = URL.createObjectURL(this.src)
                } else {
                    src = String(this.src)
                }

                color = getAvatarColor(null)
            } else {
                color = getAvatarColor(this.color)
            }

            return {
                backgroundImage: src ? `url('${src}')` : undefined,
                backgroundColor: color,
                minWidth: size,
                height: size,
            }
        },
    },
})
</script>

<style scoped>
.avatar {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    position: relative;
}

.avatar.default {
    background-size: 50%;
    background-image: url('~/assets/icon.png');
    /* filter: grayscale(60%); */
}
</style>
