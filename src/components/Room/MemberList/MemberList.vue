<template>
    <ContextMenu
        v-if="contextMenu.active"
        v-bind="contextMenu"
        @close="hideContextMenu"
    />
    <div class="list">
        <Member
            v-for="member in members"
            :key="member.user.id"
            :member="member"
            @contextmenu.prevent="onMemberContextMenu($event, member)"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Member from './Member.vue'
import ContextMenu from './ContextMenu.vue'
import { RoomMemberInfo } from '~/types'

interface ContextMenuData {
    active: boolean
    member: RoomMemberInfo
    x: number
    y: number
}

const defaultContextMenu: ContextMenuData = {
    active: false,
    member: null,
    x: 0,
    y: 0,
}

export default defineComponent({
    components: { Member, ContextMenu },
    data() {
        return {
            contextMenu: defaultContextMenu,
        }
    },
    computed: mapGetters('room', ['members']),
    methods: {
        onMemberContextMenu(e: PointerEvent, member: RoomMemberInfo) {
            this.contextMenu = {
                active: true,
                member,
                x: e.pageX || e.clientX,
                y: e.pageY || e.clientY,
            }
        },
        hideContextMenu() {
            this.contextMenu = defaultContextMenu
        },
    },
})
</script>

<style scoped>
.list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
}
</style>
