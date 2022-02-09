<template>
    <HomeLayout>
        <template v-slot:content>
            <div class="message">
                Logging out...
            </div>
        </template>
    </HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AccountService } from '~/account/account'
import HomeLayout from '~/layouts/HomeLayout.vue'

export default defineComponent({
    components: { HomeLayout },
    async mounted() {
        AccountService.logout()

        this.$router.push({ name: 'home' })
    },
})
</script>

<style scoped>
div {
    font-size: 1.4em;
}
</style>
