<template>
    <div class="menu">
        <div class="items">
            <template v-if="notifications.length > 0">
                <Item
                    v-for="item in notifications"
                    :key="item.id"
                    :item="item"
                />
            </template>
            <span class="noNotifications" v-else>
                You have no notifications at the moment.
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import Item from './Item.vue'

export default defineComponent({
    components: { Item },
    computed: mapState('session', ['notifications']),
})
</script>

<style scoped>
.menu {
    position: absolute;
    right: -1.2em;
    top: 1.8em;
    background: rgb(50, 50, 50);
    width: 20vw;
    height: 45vh;
    z-index: 5;
    border-radius: 6px;
    font-size: 0.8em;
    padding: 0.4em;
    display: flex;
}

.menu .items {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 6px;
}

.noNotifications {
    padding: 0.6em;
    font-size: 0.9em;
}
</style>
