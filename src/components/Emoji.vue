<template>
    <span class="emoji" ref="content">
        {{ content }}
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { emojify } from '~/helpers/emoji'

export default defineComponent({
    props: ['content', 'size'],
    mounted() {
        emojify(this.$refs.content, null, this.$options._scopeId)
    },
})
</script>

<style scoped>
.emoji {
    display: flex;
}

.icon {
    width: 100%;
    height: 100%;
}
</style>
