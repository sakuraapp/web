<template>
    <div class="queue">
        <div class="queueBtn" v-if="hasPermission" @click="addToQueue">
            <div class="icon">
                <FontAwesomeIcon icon="plus" />
            </div>
            <div>
                Add to Queue
            </div>
        </div>
        <div class="items">
            <template v-for="(item, index) in queue" :key="item.id">
                <QueueItem :item="item" :position="index + 1" />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { hasPermission } from 'helpers/permission'
import QueueItem from './Item.vue'

export default defineComponent({
    components: {
        QueueItem,
    },
    emits: ['queue-add-click'],
    computed: {
        hasPermission() {
            return hasPermission('QUEUE_ADD')
        },
        ...mapGetters(['queue']),
    },
    methods: {
        addToQueue() {
            this.$emit('queue-add-click')
        },
    },
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
