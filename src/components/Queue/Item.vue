<template>
    <div class="item">
        <div class="left">
            <div class="position">
                {{ position }}
            </div>
        </div>
        <div class="right">
            <div class="info">
                <div class="title">
                    <template v-if="false">
                        <img class="icon" :src="item.icon" v-if="item.icon" />
                        <FontAwesomeIcon
                            class="icon"
                            icon="globe-europe"
                            v-else
                        />
                    </template>
                    {{ title }}
                </div>
                <div class="author">
                    Added by <b>{{ item.author.username }}</b>
                </div>
            </div>
            <div class="remove" v-if="canRemove" @click="remove">
                <FontAwesomeIcon icon="times" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MediaItemInfo } from '~/types'

export default defineComponent({
    props: {
        index: Number,
        item: Object as PropType<MediaItemInfo>,
    },
    computed: {
        position(): string {
            return (this.index + 1).toString().padStart(2, '0')
        },
        title(): string {
            return this.item.title || this.item.url
        },
        canRemove(): boolean {
            return (
                this.$store.state.session.userId === this.item.author.id ||
                this.hasPermission('QUEUE_EDIT')
            )
        },
    },
    methods: {
        remove() {
            this.$store.dispatch('room/queue/remove', this.item.id)
        },
    },
})
</script>

<style scoped>
.item {
    display: flex;
    /* align-items: center;
    justify-content: center; */
    padding: 0.2em 0;
}

.item:not(:last-child) {
    border-bottom: 1px solid rgb(38, 38, 38);
}

.left {
    padding-left: 0.4em;
    margin-right: 0.4em;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    justify-content: center;
    align-items: center;
}

.position {
    /* font-size: 2em; */
    font-size: 1.7em;
    color: rgb(55, 55, 55);
    font-family: monospace;
    letter-spacing: -6px;
    /* justify-self: flex-end;
    margin-top: auto; */
}

.icon {
    width: 1.1em;
    height: 1.1em;
    margin-right: 0.1em;
    text-align: center;
    vertical-align: middle;
}

.icon img {
    width: 100%;
    height: 100%;
}

.right {
    padding: 0.4em;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.title {
    margin-bottom: 0.2em;
    line-height: 1.2em;
    font-family: Source Sans Pro;
    font-size: 0.9em;
}

.author {
    color: lightgrey;
    font-size: 0.6em;
}

.remove {
    font-size: 0.8em;
    color: rgb(150, 150, 150);
    display: flex;
    justify-content: flex-end;
    visibility: hidden;
    cursor: pointer;
    margin-top: auto;
    padding-right: 0.2em;
    padding-left: 0.2em;
}

.remove:hover {
    color: #ec5f5f;
}

.item:hover .remove {
    visibility: visible;
}
</style>
