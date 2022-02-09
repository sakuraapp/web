<template>
    <BaseAppLayout>
        <template v-slot:left>
            <h2>Friends</h2>
        </template>
        <template v-slot:center>
            <slot />
        </template>
    </BaseAppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseAppLayout from './BaseAppLayout.vue'

export default defineComponent({
    components: {
        BaseAppLayout,
    },
})
</script>
