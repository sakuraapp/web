<template>
    <div class="invitation">
        <div class="declineBtn" @click="decline">
            &times;
        </div>
        <div class="window">
            <div class="header">
                Invitation
            </div>
            <div class="message">
                You have been invited to
                <b class="owner">{{ room.owner }}'s</b> room.
            </div>
            <button @click="join">Continue</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['room'],
    methods: {
        join() {
            this.$store.dispatch('leaveRoom')
            this.$store.dispatch('joinRoom', this.room.id)
        },
        decline() {
            this.$store.commit('handleRoomInvitation', null)
        },
    },
})
</script>

<style scoped>
.invitation {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.declineBtn {
    position: absolute;
    right: 24px;
    top: 0px;
    font-size: 4em;
    /* color: #F15050; */
    color: rgb(150, 150, 150);
    cursor: pointer;
}
.window {
    background-color: rgb(45, 45, 45);
    padding: 1.4em;
    width: 30%;
    border-radius: 4px;
    font-size: 1.4em;
    text-align: center;
    display: flex;
    flex-direction: column;
}
.header {
    font-size: 1.67em;
    font-weight: bold;
    margin-bottom: 0.6em;
    color: #e9b1cd;
}
.message {
    margin-bottom: 1.4em;
}
.owner {
    color: #e9b1cd;
}
button {
    padding: 1em;
    font-size: 1em;
    border: 0;
    outline: none;
    background: rgb(35, 35, 35);
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    /* color: #e9b1cd;
    font-weight: bold; */
}
</style>
