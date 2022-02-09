<template>
    <div class="menu" :style="style">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getViewportHeight, getViewportWidth } from '~/helpers/util'

export default defineComponent({
    emits: ['close'],
    props: {
        x: {
            type: Number,
            default: 0,
        },
        y: {
            type: Number,
            default: 0,
        },
        width: {
            type: Number,
            default: 180,
        },
        height: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            realWidth: this.width,
            realHeight: this.height,
        }
    },
    computed: {
        style(): Partial<CSSStyleDeclaration> {
            let { x, y } = this
            const { realWidth, realHeight } = this

            x -= window.scrollX
            y -= window.scrollY

            const vw = getViewportWidth()
            const vh = getViewportHeight()

            if (realWidth > 0) {
                x = x - realWidth
            }

            if (x + 2 * realWidth < vw) {
                x += realWidth
            }

            if (y + realHeight > vh) {
                y -= realHeight
            }

            return {
                left: `${x}px`,
                top: `${y}px`,
                width: realWidth ? `${realWidth}px` : undefined,
                height: realHeight ? `${realHeight}px` : undefined,
            }
        },
    },
    methods: {
        close() {
            this.$emit('close')
        },
        onClick(e: MouseEvent) {
            if (!this.$el.contains(e.target)) {
                this.close()
            }
        },
        onScroll() {
            this.close()
        },
    },
    mounted() {
        if (!this.width) {
            this.realWidth = this.$el.clientWidth
        }

        if (!this.height) {
            this.realHeight = this.$el.clientHeight
        }

        document.body.addEventListener('click', this.onClick)
        window.addEventListener('scroll', this.onScroll, true)
    },
    unmounted() {
        document.body.removeEventListener('click', this.onClick)
        window.removeEventListener('scroll', this.onScroll, true)
    },
})
</script>

<style scoped>
.menu {
    position: fixed;
    border-radius: 4px;
    background-color: rgba(30, 30, 30, 0.5);
    backdrop-filter: blur(20px);
    color: #fff;
    z-index: 9999;
    padding: 0.5em 0.3em 0.5em 0.3em;
    font-size: 0.8em;
    border: 1px solid rgba(255, 255, 255, 0.15);
}
</style>
