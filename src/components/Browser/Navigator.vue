<template>
    <div class="navigator">
        <div class="addressBar">
            <button>
                <FontAwesomeIcon icon="arrow-left" />
            </button>
            <button>
                <FontAwesomeIcon icon="arrow-right" />
            </button>
            <input v-model="address" @keyup.enter="navigate" />
            <button class="btn" @click="add">
                <FontAwesomeIcon icon="plus" />
            </button>
            <button class="btn" @click="close" v-if="popup">
                <FontAwesomeIcon icon="times" />
            </button>
        </div>
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        url: String,
        popup: Boolean,
    },
    emits: ['navigate', 'add', 'close'],
    data() {
        return { address: this.url }
    },
    watch: {
        url(val: string) {
            this.address = val
        },
    },
    methods: {
        navigate() {
            this.$emit('navigate', this.address)
        },
        add() {
            this.$emit('add', this.address)
        },
        close() {
            this.$emit('close')
        },
    },
})
</script>

<style scoped>
.navigator {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.addressBar {
    background: rgb(33, 33, 33);
    flex-grow: 1;
    display: flex;
}

input,
button {
    background: transparent;
    border: 0;
    color: #fff;
    padding: 0.6em;
    font-size: 0.9em;
}

input {
    flex-grow: 1;
    font-family: Source Sans Pro;
}

.btn {
    color: rgb(170, 170, 170);
    cursor: pointer;
    transition: 300ms;
}
.btn:hover {
    color: #fff;
}
</style>
