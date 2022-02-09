<template>
    <div class="layout">
        <div class="left">
            <slot name="left" />
        </div>
        <div class="center">
            <slot name="center" />
        </div>
        <div class="right">
            <slot name="right" />
        </div>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
}

.left,
.right {
    width: 23.5%;
    align-items: flex-start;
}

.left,
.right,
.center {
    display: flex;
    flex-direction: column;
    padding-top: 2.5em;
}

.center {
    flex-grow: 1;
}

.right {
    align-items: flex-end;
}

::v-deep(h2) {
    margin-top: 0;
}
</style>
