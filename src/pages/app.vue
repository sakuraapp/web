<template>
    <template v-if="ready">
        <template v-if="!isOverlay">
            <div class="container">
                <Header />
                <router-view />
            </div>
        </template>
        <router-view v-else />
    </template>
    <Loading v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AccountService } from 'account/account'
import Header from '~/components/Header.vue'
import Loading from '~/components/Loading/Logo.vue'

export default defineComponent({
    components: {
        Header,
        Loading,
    },
    data() {
        return { ready: false }
    },
    computed: {
        isOverlay(): boolean {
            const overlay = this.$route.meta.overlay

            if (typeof overlay === 'boolean') {
                return overlay
            } else if (typeof overlay === 'function') {
                return overlay(this.$store)
            }

            return false
        },
    },
    async created() {
        this.$store.dispatch('session/getToken')

        if (AccountService.isLoggedIn()) {
            try {
                const user = await AccountService.fetchUserData()

                this.$store.commit('entities/handleUser', user)
                this.$store.commit('session/handleUserId', user.id)
            } catch (err) {
                return console.error(err)
            }
        }

        this.$store.dispatch('session/setupBridge')
        await this.$store.dispatch('session/setupClient')

        this.ready = true
    },
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 2.5% 5%;
    /* padding: 3.7% 7.5%; */
}
</style>
