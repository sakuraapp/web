<template>
    <div
        ref="el"
        :class="{ progress: true, vertical: isVertical }"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove"
        @mouseleave="onHoverEnd"
    >
        <div
            class="hoverText"
            ref="hoverText"
            v-if="hovering"
            :style="hoverTextStyle"
        >
            {{ hoverText }}
        </div>
        <div class="bar" ref="bar" :style="barStyle"></div>
        <div class="indicator" :style="indicatorStyle"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        progress: Number,
        vertical: Boolean,
    },
    data() {
        return {
            hovering: false,
            hoverProgress: null,
            hoverText: null,
            hoverTextStyle: {},
            mouseDown: false,
        }
    },
    computed: {
        percentage(): string {
            return this.progress * 100 + '%'
        },
        isVertical(): boolean {
            return this.vertical !== false && this.vertical !== undefined
        },
        barStyle(): Record<string, string> {
            return !this.isVertical
                ? { width: this.percentage }
                : { height: this.percentage }
        },
        indicatorStyle(): Record<string, string> {
            return !this.isVertical
                ? { left: this.percentage }
                : { top: (1 - this.progress) * 100 + '%' }
        },
        /*hoverTextStyle() {
            const percentage = this.hoverProgress * 100 + '%'

            return {
                left: `${percentage}`,
                transform: `translateX(-${percentage})`,
            }
        },*/
    },
    methods: {
        setHoverText(text: string) {
            this.hoverText = text
        },
        renderHoverText(): void {
            const hoverText = <HTMLElement>this.$refs.hoverText

            const elRect = this.$el.getBoundingClientRect()
            const hoverTextRect = hoverText.getBoundingClientRect()

            const textPercentage = this.isVertical
                ? hoverTextRect.height / elRect.height
                : hoverTextRect.width / elRect.width

            const offset = '-25px'
            let progress: number

            if (this.isVertical) {
                progress = 1 - this.hoverProgress - textPercentage / 2
            } else {
                progress = this.hoverProgress - textPercentage / 2
            }

            const percentage = progress * 100 + '%'

            this.hoverTextStyle = this.isVertical
                ? {
                      top: percentage,
                      left: offset,
                  }
                : {
                      top: offset,
                      left: percentage,
                  }
        },
        onMouseMove(e: MouseEvent) {
            const bounds = this.$el.getBoundingClientRect()
            const x = e.clientX - bounds.left
            const y = e.clientY - bounds.top

            let percentage = !this.isVertical
                ? x / bounds.width
                : 1 - y / bounds.height

            if (percentage > 1) {
                percentage = 1
            } else if (percentage < 0) {
                percentage = 0
            }

            this.hovering = true
            this.hoverProgress = percentage

            this.$emit('hover', percentage, this.setHoverText.bind(this))

            if (this.mouseDown) {
                this.onChange()
            }

            this.$nextTick(() => {
                this.renderHoverText()
            })
        },
        onHoverEnd() {
            this.hovering = false
            this.hoverProgress = null
            this.hoverText = null
        },
        onChange() {
            this.$emit('change', this.hoverProgress)
        },
        onMouseDown() {
            this.mouseDown = true
        },
        onMouseUp() {
            this.mouseDown = false
            this.onChange()
        },
    },
    watch: {
        hoverText() {
            this.$nextTick(() => {
                if (this.hoverText) {
                    this.renderHoverText()
                }
            })
        },
    },
})
</script>

<style scoped>
.progress {
    flex-grow: 1;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    height: 4px;
    display: flex;
    align-items: center;
    position: relative;
}
.progress.vertical {
    width: 4px;
    height: auto;
    align-items: flex-end;
    justify-content: center;
}
.progress .bar {
    background-color: rgba(255, 255, 255, 0.8);
    height: 100%;
    border-radius: 3px 0 0 3px;
    display: flex;
    justify-content: flex-end;
    position: absolute;
}
.progress.vertical .bar {
    width: 100%;
    height: auto;
    border-radius: 3px;
}
.progress .indicator {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    /* top: 50%;
    transform: translateY(-50%); */
    /* left: -1; */
    cursor: pointer;
}
.progress.vertical .indicator {
    left: auto;
    bottom: -1px;
}

.hoverText {
    position: absolute;
    font-size: 0.8em;
    text-align: center;
}
</style>
