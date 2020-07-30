<template>
    <div id="profile" :class="{ userProfile: true, right: alignRight }">
        <div class="avatar" :style="`backgroundImage: url('${avatar}')`"></div>
        <div class="info">
            <div class="username">{{ username }}</div>
            <div class="discriminator">#{{ discriminator }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: ['user', 'alignRight'],
    data() {
        return this.user
    },
})
</script>

<style>
.userProfile {
    display: flex;
    /* font-size: 1.2em; */
    align-items: center;
}
.userProfile.right {
    flex-direction: row-reverse;
    text-align: right;
}

.userProfile .avatar {
    width: 36px;
    height: 36px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 0.5em;
}
.userProfile.right .avatar {
    margin-right: 0;
    margin-left: 0.5em;
}

.userProfile .info {
    display: flex;
    flex-direction: column;
}
.userProfile .discriminator {
    font-size: 0.6em;
    color: lightgrey;
}
</style>
