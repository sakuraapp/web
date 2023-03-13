<template>
    <div class="container">
        <div class="settings">
            <Item label="Room Name" :value="name" @change="updateName" />
            <Item
                label="Room Type"
                type="radio"
                :value="isPrivate"
                :options="[
                    {
                        label: 'Public',
                        value: false,
                    },
                    {
                        label: 'Private',
                        value: true,
                    },
                ]"
                @change="updateType"
            />
            <div class="buttons">
                <button @click="requestVM" :disabled="vmRequestBusy">
                    Request a VM
                </button>
                <button class="applyBtn" @click="save">
                    Save
                    <span>
                        <FontAwesomeIcon
                            icon="asterisk"
                            class="asterisk"
                            v-if="isDifferent"
                        />
                    </span>
                </button>
            </div>
        </div>
        <div class="memberList">
            <Label>Members</Label>
            <MemberList />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import Item from './Item.vue'
import Label from '~/components/Form/Label.vue'
import MemberList from '../MemberList/MemberList.vue'

export default defineComponent({
    components: {
        Item,
        Label,
        MemberList,
    },
    data() {
        const { info } = this.$store.state.room

        return {
            name: info.name,
            isPrivate: info.private,
            vmRequestBusy: false,
        }
    },
    computed: {
        isDifferent(): boolean {
            return (
                this.name !== this.info.name ||
                this.isPrivate !== this.info.private
            )
        },
        ...mapState('room', ['info']),
    },
    methods: {
        updateName(value: string): void {
            this.name = value
        },
        updateType(value: boolean): void {
            this.isPrivate = value
        },
        async save(): Promise<void> {
            if (!this.isDifferent) {
                return
            }

            await this.$store.dispatch('room/updateRoom', {
                name: this.name,
                private: this.isPrivate,
            })
        },
        async requestVM(): Promise<void> {
            if (this.vmRequestBusy) return

            this.vmRequestBusy = true
            await this.$store.dispatch('room/requestVM')
            this.vmRequestBusy = false
        },
    },
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.settings,
.memberList .label {
    padding: 0.6em 1em 0 1em;
}

.settings .buttons {
    display: flex;
    /* justify-content: flex-end; */
    margin-bottom: 0.4em;
}

.settings .buttons button {
    flex-grow: 1;
    /* width: 50%; */
    min-width: 40%;
    border: 1px solid rgb(60, 60, 60);
    border-radius: 4px;
    color: #fff;
    background: rgb(20, 20, 20);
    padding: 0.6em;
    font: inherit;
    font-size: 0.8em;
    cursor: pointer;
    transition: 300ms;
}

.settings .buttons button:hover {
    border-color: #fff;
}

.settings .buttons button:not(:last-child) {
    margin-right: 0.6em;
}

.settings .buttons button span {
    position: relative;
}

.settings .buttons button .asterisk {
    position: absolute;
    font-size: 0.45em;
    top: 0.2em;
    left: 0.2em;
    /* color: #e9b1cd; */
}

.applyBtn:hover {
    /* background: #6eb344 !important; */
    background: rgb(20, 20, 20) !important;
    border-color: #e9b1cd !important;
    color: #e9b1cd !important;
}
</style>
