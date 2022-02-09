<template>
    <HomeLayout>
        <template v-slot:content>
            <div class="message">
                {{ message }}
            </div>
        </template>
    </HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeLayout from '~/layouts/HomeLayout.vue'
import { User } from '~/types'

export default defineComponent({
    components: { HomeLayout },
    data() {
        return {
            message: 'Authenticating...',
        }
    },
    async mounted() {
        const { providerId } = this.$route.params
        const { code, state } = this.$route.query

        if (!code) return

        try {
            const res = await this.axios.get(`/auth/${providerId}/callback`, {
                params: { code, state },
                withCredentials: true,
            })

            const {
                token,
                user,
            }: {
                token: string
                user: User
            } = res.data

            if (token) {
                this.$store.dispatch('session/saveToken', token)

                const nextUrl = <string>this.$route.params.nextUrl

                this.$router.push(nextUrl || { name: 'app' })
            } else if (user) {
                this.$router.push({
                    name: 'completeAuth',
                    params: {
                        username: user.username,
                        avatar: user.avatar,
                    },
                })
            }
        } catch (err) {
            console.error(err)

            this.message =
                'An error occured. Please go to the homepage and try logging in again.'
        }
    },
})
</script>

<style scoped>
div {
    font-size: 1.4em;
}
</style>
