<template>
    <component
        v-if="component"
        :isPopup="true"
        :class="classAttr"
        :is="component"
        @close="close"
    >
        <div class="closeBtn" @click="close">
            &times;
        </div>
    </component>
    <div :class="classAttr" @click="onClick" v-else>
        <div class="content" ref="content">
            <div class="closeBtn" @click="close">
                &times;
            </div>
            <slot />
        </div>
        <slot name="body" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

function isPropTrue(val?: unknown): boolean {
    return val !== undefined && val !== false
}

export default defineComponent({
    props: ['component', 'flexbox', 'center'],
    computed: {
        classAttr() {
            return {
                popup: true,
                flex: isPropTrue(this.flexbox),
                center: isPropTrue(this.center),
            }
        },
    },
    methods: {
        onClick(e: MouseEvent) {
            if (e.composedPath()[0] === this.$refs.content) {
                this.close()
            }
        },
        close() {
            this.$emit('close')
        },
    },
})
</script>

<style>
.popup {
    position: absolute !important;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(35, 35, 35, 0.8);
    z-index: 9999;
}
.popup .closeBtn {
    position: absolute;
    right: 20px;
    top: 0px;
    font-size: 2.5em;
    color: rgb(125, 125, 125);
    cursor: pointer;
}
.popup .content {
    position: relative;
}
.popup.flex .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.popup.flex.center .content {
    justify-content: center;
    align-items: center;
}
</style>
