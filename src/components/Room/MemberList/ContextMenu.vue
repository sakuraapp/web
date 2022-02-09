<template>
    <Menu v-bind="$props">
        <template v-if="isSuperior">
            <Item v-if="hasPermission('KICK_MEMBERS')" @click="kick()">
                Kick
            </Item>
            <template v-if="hasPermission('MANAGE_ROLES')">
                <Item v-if="!targetIsManager" @click="addRole('MANAGER')">
                    Promote to Manager
                </Item>
                <Item v-else @click="removeRole('MANAGER')">
                    Demote from Manager
                </Item>
            </template>
        </template>
    </Menu>
</template>

<script lang="ts">
import { Role } from '@sakuraapp/common'
import { defineComponent, PropType } from 'vue'
import { mapGetters } from 'vuex'
import Menu from '~/components/ContextMenu/ContextMenu.vue'
import Item from '~/components/ContextMenu/Item.vue'
import { getRole, RoleName } from '~/helpers/permission'
import { RoomMemberInfo } from '~/types'

export default defineComponent({
    components: { Menu, Item },
    props: {
        member: Object as PropType<RoomMemberInfo>,
    },
    computed: {
        ...mapGetters('room', ['roles']),
        isSuperior(): boolean {
            const hisHighestRole = Math.max(...this.member.roles)
            const myHighestRole = Math.max(...this.roles)

            if (hisHighestRole >= myHighestRole) {
                return false
            }

            return true
        },
        targetIsManager(): boolean {
            return this.member.roles.includes(Role.MANAGER)
        },
        showMenu(): boolean {
            return this.isSuperior
        },
    },
    methods: {
        kick() {
            this.$store.dispatch('room/kick', this.member.user.id)
        },
        addRole(name: RoleName) {
            const roleId = getRole(name)

            this.$store.dispatch('room/addRole', {
                userId: this.member.user.id,
                roleId,
            })
        },
        removeRole(name: RoleName) {
            const roleId = getRole(name)

            this.$store.dispatch('room/removeRole', {
                userId: this.member.user.id,
                roleId,
            })
        },
    },
    mounted() {
        if (!this.showMenu) {
            this.$emit('close')
        }
    },
})
</script>
