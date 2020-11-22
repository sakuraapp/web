<template>
    <div class="item">
        <div class="position">{{ position }}.</div>
        <img class="icon" :src="item.icon" v-if="item.icon" />
        <FontAwesomeIcon class="icon" icon="globe-europe" v-else />
        <div class="info">
            <div class="title">
                {{ item.title }}
            </div>
            <div class="author">
                Added by <b>{{ item.author.username }}</b>
            </div>
        </div>
        <div class="remove" title="Remove" v-if="canRemove" @click="remove">
            <FontAwesomeIcon icon="times" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { hasPermission } from '~/helpers/permission'

export default Vue.extend({
    props: ['item', 'position'],
    computed: {
        canRemove() {
            return hasPermission('QUEUE_REMOVE')
        },
    },
    methods: {
        remove() {
            this.$store.dispatch('queueRemove', this.item)
        },
    },
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
    position: relative;
}
.item .icon {
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
.item .remove {
    font-size: 0.7em;
    color: rgb(150, 150, 150);
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 1em;
    right: 1em;
    visibility: hidden;
    cursor: pointer;
}
.item .remove:hover {
    color: #ec5f5f;
}
.item:hover .remove {
    visibility: visible;
}
</style>
