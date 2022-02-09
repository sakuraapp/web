<template>
    <div class="queue">
        <div class="addBtn" v-if="canAdd" @click="showPopup">
            <FontAwesomeIcon class="icon" icon="plus" />
            Add to Queue
        </div>
        <teleport to="#roomBody">
            <Popup v-if="popupVisible" @close="hidePopup" hideCloseButton>
                <Browser popup @add="addToQueue" @close="hidePopup" />
            </Popup>
        </teleport>
        <div class="items">
            <template v-for="(item, index) in queue" :key="item.id">
                <Item :item="item" :index="index" />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Popup from '~/components/Popup/Popup.vue'
import Browser from '../Browser/Browser.vue'
import Item from './Item.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
    components: {
        Popup,
        Browser,
        Item,
    },
    data() {
        return { popupVisible: false }
    },
    computed: {
        canAdd(): boolean {
            return this.hasPermission('QUEUE_ADD')
        },
        ...mapGetters('room/queue', { queue: 'items' }),
    },
    methods: {
        showPopup() {
            this.popupVisible = true
        },
        hidePopup() {
            this.popupVisible = false
        },
        addToQueue(url: string) {
            this.$store.dispatch('room/queue/add', url)
            this.hidePopup()
        },
    },
})
</script>

<style scoped>
.queue {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
}

.addBtn {
    text-align: center;
    font-family: 'Roboto Condensed';
    font-weight: bold;
    text-transform: uppercase;
    padding: 0.6em;
    color: rgb(130, 130, 130);
    cursor: pointer;
    background: rgb(35, 35, 35);
    border-top: 1px solid rgb(60, 60, 60);
    border-bottom: 1px solid rgb(45, 45, 45);
}

.addBtn .icon {
    margin-right: 0.4em;
}

.items {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
</style>
