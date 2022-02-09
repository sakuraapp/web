<template>
    <div class="container">
        <Label>Members</Label>
        <MemberList />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Label from '~/components/Form/Label.vue'
import MemberList from '~/components/Room/MemberList/MemberList.vue'

export default defineComponent({
    components: {
        Label,
        MemberList,
    },
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.label {
    padding: 0.6em 1em 0 1em;
}
</style>
