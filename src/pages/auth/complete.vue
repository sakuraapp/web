<template>
    <HomeLayout>
        <template v-slot:content>
            <SignUpForm :username="username" :avatar="avatar" />
        </template>
    </HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeLayout from '~/layouts/HomeLayout.vue'
import SignUpForm from '~/components/Auth/SignUpForm.vue'

export default defineComponent({
    components: {
        HomeLayout,
        SignUpForm,
    },
    props: {
        username: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: false,
        },
    },
    beforeRouteEnter(to) {
        if (!to.params.username) {
            return '/'
        }
    },
})
</script>

<style scoped>
:deep(.content) {
    flex-grow: 1;
    align-items: flex-start;
    padding: 0 20% 0 20%;
}
</style>
