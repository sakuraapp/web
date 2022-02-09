<template>
    <div class="picker">
        <label>
            <Avatar :src="value" :color="color" :size="100">
                <input
                    accept="image/png, image/jpeg"
                    type="file"
                    @change="onFileChange"
                />
                <div class="overlay">
                    <div class="label">
                        Change Avatar
                    </div>
                    <div class="icon">
                        <FontAwesomeIcon icon="pencil-alt" />
                    </div>
                </div>
            </Avatar>
        </label>
        <button class="removeBtn" @click="remove">
            Remove
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from './Avatar.vue'

export default defineComponent({
    components: { Avatar },
    emits: ['change'],
    props: {
        value: [String, File],
        color: {
            type: Number,
            required: false,
        },
    },
    methods: {
        onFileChange(e: Event) {
            const input = e.target as HTMLInputElement
            const file = input.files.item(0)

            if (file) {
                this.$emit('change', file)
            }
        },
        remove() {
            this.$emit('change', null)
        },
    },
})
</script>

<style scoped>
.picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
}

.avatar {
    margin-bottom: 0.4em;
}

.removeBtn {
    border: 0;
    font-size: 0.85em;
    background: transparent;
    color: rgb(220, 220, 220);
    border-bottom: 1px solid rgb(220, 220, 220);
    text-transform: lowercase;
    cursor: pointer;
    transition: 150ms;
    padding: 0.2em 0 0.2em 0;
}
.removeBtn:hover {
    color: #fff;
    border-color: #fff !important;
}

.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 9990;
}

.icon {
    right: 0px;
    top: 5px;
    position: absolute;
    color: rgb(80, 80, 80);
    background: rgb(220, 220, 220);
    border-radius: 50%;
    width: 2em;
    height: 2em;
    font-size: 0.7em;
    display: flex;
    align-items: center;
    justify-content: center;
}

.label {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    font-weight: bold;
    font-size: 0.6em;
    opacity: 0;
    transition: 300ms;
    word-spacing: 9999rem;
}

.overlay:hover .label {
    opacity: 1;
}

input[type='file'] {
    display: none;
}
</style>
