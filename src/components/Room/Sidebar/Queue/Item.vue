<template>
    <div class="item">
        <div class="position">{{ position }}.</div>
        <img :src="item.icon" />
        <div class="info">
            <div class="title">
                {{ item.title }}
            </div>
            <div class="author">
                Added by <b>{{ item.author.username }}</b>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: ['item', 'position'],
    mounted() {
        console.log(this.item)
    },
})
</script>

<style scoped>
.item {
    padding: 0.6em 1.2em 0.6em 1.2em;
    display: flex;
    border-bottom: 1px solid rgb(50, 50, 50);
    font-size: 0.9em;
}
.item img {
    width: 1em;
    height: 1em;
    margin-right: 0.8em;
    margin-top: 0.15em;
}
.item .position {
    margin-right: 0.6em;
    font-weight: bold;
}
.item .info {
    display: flex;
    flex-direction: column;
}
.item .info .title {
    margin-bottom: 0.2em;
}
.item .info .author {
    padding-left: 0.1em;
    font-size: 0.6em;
    color: lightgrey;
}
</style>
