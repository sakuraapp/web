<template>
    <div class="item">
        <Label>{{ label }}</Label>
        <div class="value">
            <input
                type="text"
                v-if="type === 'text'"
                :class="classes"
                :value="value"
                @input="onChange($event.target.value)"
            />
            <template v-else-if="type === 'radio'">
                <div
                    class="option"
                    v-for="option in options"
                    :key="option.label"
                >
                    <label>
                        <input
                            type="radio"
                            :name="`${formName}.${label}`"
                            :value="option.value"
                            :checked="value === option.value"
                            :class="classes"
                            @change="onChange(option.value)"
                        />
                        <span>{{ option.label }}</span>
                    </label>
                </div>
            </template>
            <slot v-else-if="type === 'custom'" />
        </div>
        <div class="error" v-if="error">
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Label from './Label.vue'

interface Option<T> {
    label: string
    value: T
}

export default defineComponent({
    components: { Label },
    props: {
        label: String,
        type: {
            type: String,
            default: 'text',
        },
        options: {
            type: Array as PropType<Array<Option<unknown>>>,
        },
        value: null,
        formName: {
            type: String,
            default: 'form',
        },
        error: String,
    },
    emits: ['change'],
    data() {
        return { currentValue: this.value }
    },
    computed: {
        classes(): Record<string, boolean> {
            return { error: Boolean(this.error) }
        },
    },
    methods: {
        onChange(val: unknown) {
            this.$emit('change', val)
        },
    },
})
</script>

<style scoped>
.item {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
}

.item:last-child {
    margin-bottom: 0;
}

.value {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
.value input:not([type='radio']),
.value select,
.value .option {
    width: 100%;
    flex-grow: 1;
}

input:not([type='radio']) {
    border: 1px solid rgb(60, 60, 60);
    border-radius: 4px;
    background: rgb(40, 40, 40);
    padding: 0.6em;
    color: #fff;
    font-size: 1em;
    /* font-family: 'Nunito'; */
}

input[type='radio'] {
    appearance: none;
    margin: 0;
    background: rgb(40, 40, 40);
    font: inherit;
    color: #000;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid rgb(60, 60, 60);
    border-radius: 50%;
    vertical-align: middle;
    display: inline-grid;
    place-content: center;
    cursor: pointer;
}

input[type='radio']::before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em rgb(130, 130, 130);
}

input[type='radio']:checked::before {
    transform: scale(1);
}

input.error {
    border-color: #c43232;
}
div.error {
    margin-top: 0.4em;
    font-size: 0.8em;
    color: #c43232;
}

.option label {
    cursor: pointer;
}

.option label span {
    margin-left: 0.3em;
    vertical-align: middle;
}

.option:not(:last-child) {
    margin-bottom: 0.4em;
}
</style>
