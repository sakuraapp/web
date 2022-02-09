<template>
    <div class="container">
        <div class="icon">
            <img src="~/assets/icon.png" />
        </div>
        <div class="message" v-if="message">
            {{ message }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        message: String,
    },
})
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    font-size: 1.8em;
}

.message {
    margin-top: 2em;
}

.icon {
    width: 5em;
    height: 5em;
    /* filter: grayscale(60%); */
    animation: rotation 5s infinite linear;
}

.icon img {
    width: 100%;
    height: 100%;
}

@keyframes rotation {
    0%,
    10% {
        transform: rotate(0deg);
    }

    30%,
    100% {
        transform: rotate(360deg);
    }
}
</style>
