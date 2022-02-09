<template>
    <div class="item">
        <Icon :item="item" />
        <Message :item="item" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Notification } from '~/types'
import Icon from './Icon.vue'
import Message from './Message.vue'

export default defineComponent({
    components: {
        Icon,
        Message,
    },
    props: {
        item: {
            type: Object as PropType<Notification<unknown>>,
            required: true,
        },
    },
})
</script>

<style scoped>
.item {
    background: rgb(60, 60, 60);
    padding: 0.8em 0.64em;
    border-radius: 6px;
    display: flex;
    /* justify-content: center;
    align-items: center; */
}

.item:not(:last-child) {
    margin-bottom: 0.4em;
}
</style>
