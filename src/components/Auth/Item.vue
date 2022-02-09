<template>
    <Item formName="auth" v-bind="$props">
        <slot />
    </Item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Item from '~/components/Form/Item.vue'

export default defineComponent({
    components: { Item },
})
</script>
