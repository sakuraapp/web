<template>
    <div class="sakuraLogo">
        <img src="~/assets/icon.png" />
        <span v-if="!iconOnly">Sakura</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['iconOnly'],
})
</script>

<style>
.sakuraLogo {
    text-transform: uppercase;
    color: #e9b1cd;
    font-size: 1em;
    font-family: Roboto;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sakuraLogo img {
    height: 1.13em;
}
.sakuraLogo img:not(:last-child) {
    margin-right: 0.2em;
}
</style>
