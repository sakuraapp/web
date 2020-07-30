<template>
    <div>
        {{ message }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            message: 'Authenticating...',
        }
    },
    async mounted() {
        const { code } = this.$route.query

        if (!code) return

        try {
            const res = await this.$axios.get('/auth/login', {
                params: { code },
            })

            const { token } = res.data

            if (!token) {
                throw new Error('No token received.')
            }

            this.$store.commit('handleToken', { token, save: true })

            const { nextUrl } = this.$route.params

            this.$router.push(nextUrl || { name: 'main' })
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
