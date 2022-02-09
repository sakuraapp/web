<template>
    <div class="item" v-if="hasTracks">
        <TrackMenu v-if="showMenu" />
        <button @click="onBtnClick">
            <FontAwesomeIcon icon="closed-captioning" @click="toggleMenu" />
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import TrackMenu from './TrackMenu.vue'

export default defineComponent({
    components: { TrackMenu },
    data() {
        return { showMenu: false }
    },
    computed: {
        hasTracks(): boolean {
            return (
                this.player.textTracks.length > 0 ||
                this.player.audioTracks.length > 0
            )
        },
        ...mapState(['player']),
    },
    methods: {
        toggleMenu() {
            if (this.showMenu) {
                this.hide()
            } else {
                this.show()
            }
        },
        show() {
            this.showMenu = true
            this.bind()
        },
        hide() {
            this.unbind()
            this.showMenu = false
        },
        bind() {
            document.body.addEventListener('click', this.onClick)
        },
        unbind() {
            document.body.removeEventListener('click', this.onClick)
        },
        onClick(e: MouseEvent) {
            if (!this.$el.contains(e.target)) {
                this.showMenu = false
            }
        },
    },
})
</script>
