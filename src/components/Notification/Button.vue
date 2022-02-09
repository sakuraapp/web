<template>
    <div class="container">
        <div class="button" @click="toggleMenu">
            <FontAwesomeIcon :icon="['far', 'bell']" />
            <span class="signal" v-if="unreadNotifications"></span>
        </div>
        <Menu v-if="showMenu" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import Menu from './Menu.vue'

export default defineComponent({
    components: { Menu },
    data() {
        return { showMenu: false }
    },
    computed: mapState('session', ['unreadNotifications']),
    methods: {
        toggleMenu() {
            if (this.showMenu) {
                this.close()
            } else {
                this.open()
            }
        },
        open() {
            this.showMenu = true
            this.markAsRead()

            document.body.addEventListener('click', this.onClick, true)
        },
        close() {
            this.showMenu = false

            document.body.removeEventListener('click', this.onClick, true)
        },
        onClick(e: MouseEvent) {
            if (!this.$el.contains(e.target)) {
                this.close()
            }
        },
        markAsRead(): void {
            this.$store.commit('session/handleUnreadNotifications', false)
        },
    },
    watch: {
        unreadNotifications(val: boolean) {
            if (val && this.showMenu) {
                this.markAsRead()
            }
        },
    },
})
</script>

<style scoped>
.button {
    cursor: pointer;
}

.signal {
    position: absolute;
    top: -0.1em;
    right: -0.1em;
    width: 0.6em;
    height: 0.6em;
    border: 2px solid var(--site_bg);
    border-radius: 50%;
    background: #e81919;
}
</style>
