<template>
    <div>
        {{ message }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            message: 'Authenticating...',
        }
    },
    async mounted() {
        const { providerId } = this.$route.params
        const { code } = this.$route.query

        if (!code) return

        try {
            const res = await this.$axios.get(`/oauth2/${providerId}/login`, {
                params: { code },
            })

            const { token } = res.data

            if (!token) {
                throw new Error('No token received.')
            }

            this.$store.commit('handleToken', { token, save: true })

            const { nextUrl } = this.$route.params

            this.$router.push(nextUrl || { name: 'app' })
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
    font-size: 1.8em;
}
</style>
