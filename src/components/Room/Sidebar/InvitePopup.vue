<template>
    <Popup @close="close" flexbox center>
        <div class="header">
            Invite Link
        </div>
        <input
            type="text"
            :value="inviteUrl"
            ref="input"
            @click="copy"
            readonly
        />
    </Popup>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Popup from '~/components/Popup.vue'
import { getAbsoluteUrl } from '~/helpers/util'

export default Vue.extend({
    components: {
        Popup,
    },
    computed: {
        ...mapState(['room']),
        inviteUrl() {
            return getAbsoluteUrl(`/room/${this.room.id}`)
        },
    },
    methods: {
        copy() {
            this.$refs.input.focus()
            this.$refs.input.select()

            document.execCommand('copy')
        },
        close() {
            this.$emit('close')
        },
    },
})
</script>

<style scoped>
.header {
    font-size: 1.4em;
    font-weight: bold;
    margin-bottom: 0.6em;
}
input {
    background-color: rgba(25, 25, 25, 0.8);
    font-size: 1em;
    padding: 0.8em 1em 0.8em 1em;
    border: 0;
    border-radius: 50px;
    outline: none;
    color: #fff;
    /* border: 2px solid var(--address-bar-border); */
    font-family: Source Sans Pro;
    width: 21em;
    text-align: center;
}
</style>
