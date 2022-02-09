<template>
    <div class="container">
        <div class="message">
            Trying to load content from <strong>{{ host }}</strong>
        </div>
        <div class="url">
            {{ url }}
        </div>
        <div class="buttons">
            <button class="once" @click="allowOnce">
                <FontAwesomeIcon icon="check" />
                Allow Once
            </button>
            <button @click="allowAlways">
                Always Allow
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { getHost } from '~/helpers/util'

export default defineComponent({
    emits: ['allowOnce'],
    computed: {
        host(): string {
            return getHost(this.url)
        },
        ...mapState('player', ['url']),
    },
    methods: {
        allowOnce() {
            this.$emit('allowOnce')
        },
        allowAlways() {
            this.$store.commit('settings/handleAddTrustedSite', this.host)
        },
    },
})
</script>

<style scoped>
.container {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1.2em;
}

.url {
    font-size: 0.8em;
    margin: 1.4em 0;
    padding: 0.6em;
    border: 2px solid rgb(50, 50, 50);
    border-radius: 4px;
    background: rgb(20, 20, 20);
    width: 55%;
}

.buttons {
    display: flex;
}

button {
    flex-grow: 1;
    border: 1px solid rgb(60, 60, 60);
    border-radius: 4px;
    color: #fff;
    background: rgb(20, 20, 20);
    padding: 0.6em;
    font: inherit;
    font-family: Roboto;
    font-size: 0.8em;
    cursor: pointer;
    color: #fff;
    transition: 300ms;
    min-width: 10em;
}
button:not(:last-child) {
    margin-right: 0.6em;
}
button:hover {
    border-color: rgb(200, 200, 200);
}

button.once {
    border-color: #d485ad;
    background: #d485ad;
}
button.once:hover {
    color: #d485ad;
    background: transparent;
}

button svg {
    margin-right: 0.4em;
}
</style>
