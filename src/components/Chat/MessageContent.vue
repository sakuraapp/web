<template>
    <span class="markdown">
        {{ formattedContent }}
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import emoji, { emojify } from '~/helpers/emoji'

export default defineComponent({
    props: ['content', 'size'],
    computed: {
        formattedContent() {
            return emoji.emojify(this.content)
        },
    },
    methods: {
        emojify() {
            emojify(this.$el, null, this.$options._scopeId)
        },
    },
    mounted() {
        this.emojify()
    },
    updated() {
        this.emojify()
    },
})
</script>

<style scoped>
.markdown {
    display: flex;
}

.icon {
    height: 1.375em;
    width: 1.375em;
    margin: 0 0.2em;
}
</style>
