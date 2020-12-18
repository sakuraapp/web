<template>
    <div
        class="player"
        tabindex="0"
        ref="player"
        @mousemove="handleMouseEvent"
        @mousedown="handleMouseEvent"
        @mouseup="handleMouseEvent"
        @keydown="handleKeyboardEvent"
        @keyup="handleKeyboardEvent"
    >
        <video ref="video" @loadedmetadata="handleMetadata" />
        <div
            style="position: absolute; background: green; pointer-events: none;"
            ref="test"
        ></div>
    </div>
</template>

<style scoped>
.player {
    flex-grow: 1;
    display: flex;
    background: #000;
    justify-content: center;
    align-items: center;
    position: relative;
}
video {
    width: 100%;
    /* height: 100%; */
    outline: inherit;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { ControlEvent } from '~/store'
import { hasPermission } from '~/helpers/permission'
import { mountChakra } from '~/helpers/chakra'

export default Vue.extend({
    data() {
        return {
            flvPlayer: null,
            rect: null,
        }
    },
    computed: {
        width() {
            return this.$refs.video.videoWidth
        },
        height() {
            return this.$refs.video.videoHeight
        },
        ...mapState(['player', 'room']),
    },
    methods: {
        getRect() {
            const rect = this.$refs.video.getBoundingClientRect()

            /* const videoAspectRatio = this.width / this.height
            const targetAspectRatio = rect.width / rect.height

            let adjustedWidth = rect.width
            let adjustedHeight = rect.height

            if (videoAspectRatio > targetAspectRatio) {
                adjustedHeight = rect.width / videoAspectRatio
            } else if (videoAspectRatio < targetAspectRatio) {
                adjustedWidth = rect.height * videoAspectRatio
            }

            return (this.rect = {
                width: adjustedWidth,
                height: adjustedHeight,
                x: rect.width / 2 - adjustedWidth / 2,
                y: rect.height / 2 - adjustedHeight / 2,
            })*/

            return (this.rect = rect)
        },
        handleMouseEvent(e: MouseEvent) {
            const rect = this.rect

            if (
                rect &&
                e.clientY >= rect.y &&
                e.clientY <= rect.y + rect.height
            ) {
                if (e.clientX >= rect.x && e.clientX <= rect.x + rect.width) {
                    const scaleX = this.width / rect.width
                    const scaleY = this.height / rect.height

                    const x = (e.clientX - rect.x) * scaleX
                    const y = (e.clientY - rect.y) * scaleY

                    console.log(x, y)

                    this.dispatch({
                        type: e.type,
                        data: {
                            x,
                            y,
                            type: 1,
                        },
                    })
                }
            }
        },
        handleKeyboardEvent(e: KeyboardEvent) {
            console.log(e)
            this.dispatch({
                type: e.type,
                data: {
                    key: e.key,
                },
            })
        },
        handleMetadata() {
            this.getRect()
        },
        handleResize() {
            if (this.width && this.height) {
                this.getRect()
            }
        },
        dispatch(data: ControlEvent) {
            const keyMap: { [key: string]: string } = {
                Meta: 'Control',
                Backspace: 'BackSpace',
                ArrowLeft: 'Left',
                ArrowRight: 'Right',
                ArrowUp: 'Up',
                ArrowDown: 'Down',
            }

            if (hasPermission('VIDEO_REMOTE')) {
                const mappedKey = keyMap[data.data.key]

                if (mappedKey) {
                    data.data.key = mappedKey
                }

                this.$store.dispatch('dispatchControl', data)
            }
        },
    },
    mounted() {
        window.addEventListener('resize', this.handleResize)
        mountChakra(
            {
                url: this.player.url,
                room: this.room.id,
            },
            this.$refs.video
        )
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },
})
</script>
