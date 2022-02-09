<template>
    <div class="container">
        <div class="navbar">
            <router-link class="left" to="/">
                <Logo />
            </router-link>
            <div class="right">
                <slot name="nav" />
            </div>
        </div>
        <div class="content">
            <slot name="content" />
        </div>
        <div class="footer"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '~/components/Logo.vue'

export default defineComponent({
    components: {
        Logo,
    },
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: #1d1d1d;
    font-size: 1.2em;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    padding: 0 4em;
    overflow-y: auto;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.4em 0;
}

.navbar .left,
.navbar .center,
.navbar .right {
    display: flex;
    align-items: center;
}

.navbar ::v-deep(.item) {
    font-size: 0.8em;
    font-weight: bold;
}

.navbar ::v-deep(.item:not(:last-child)) {
    margin-right: 1.2em;
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
