<template>
    <div class="sakuraLogo" :style="style">
        <img src="~/assets/icon.png" />
        <span v-if="!iconOnly">Sakura</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        iconOnly: Boolean,
        textTransform: {
            type: String,
            default: 'lowercase',
        },
        size: {
            required: false,
        },
    },
    computed: {
        style(): Partial<CSSStyleDeclaration> {
            return {
                textTransform: this.textTransform,
                fontSize: this.size ? `${this.size}px` : undefined,
            }
        },
    },
})
</script>

<style>
.sakuraLogo {
    color: #e9b1cd;
    font-size: 1em;
    font-family: Roboto;
    /* font-weight: bold; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.sakuraLogo img {
    height: 1.13em;
}
.sakuraLogo img:not(:last-child) {
    margin-right: 0.4em;
}
</style>
