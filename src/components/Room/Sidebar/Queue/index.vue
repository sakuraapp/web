<template>
    <div class="queue">
        <div class="queueBtn" @click="addToQueue">
            <div class="icon">
                <FontAwesomeIcon icon="plus" />
            </div>
            <div>
                Add to Queue
            </div>
        </div>
        <div class="items">
            <template v-for="(item, index) in queue">
                <QueueItem :item="item" :position="index + 1" :key="item.id" />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import QueueItem from './Item.vue'

export default Vue.extend({
    components: {
        QueueItem,
    },
    computed: mapGetters(['queue']),
    methods: {
        addToQueue() {
            this.$emit('queueAddClick')
        }
    }
})
</script>

<style scoped>
.queue {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
.queue .queueBtn {
    display: flex;
    justify-content: center;
    padding: 1em;
    font-size: 1em;
    font-family: Roboto;
    /* font-weight: bold;
    text-transform: uppercase; */
    color: #e9b1cd;
    background-color: rgb(42, 42, 42);
    border-bottom: 1px solid rgb(30, 30, 30);
    /* border-bottom: 1px solid #e9b1cd; */
    cursor: pointer;
}
.queue .queueBtn .icon {
    margin-right: 1.4em;
}
.queue .items {
    display: flex;
    flex-direction: column;
}
</style>