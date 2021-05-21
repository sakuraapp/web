<template>
    <Popup :component="Browser" v-if="asPopup" @close="close" />
    <Browser v-else @close="close" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Browser from './Browser.vue'
import Popup from '../Popup.vue'

export default defineComponent({
    props: ['asPopup'],
    components: {
        Browser,
        Popup,
    },
    data() {
        return { Browser }
    },
    methods: {
        close() {
            this.$emit('close')
        },
    },
})
</script>
