<template>
    <span class="emoji" ref="content">
        {{ content }}
    </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { emojify } from '~/helpers/emoji'

export default Vue.extend({
    props: ['content', 'size'],
    mounted() {
        emojify(this.$refs.content)
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
