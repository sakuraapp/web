<template>
    <div class="item">
        <slot />
    </div>
</template>

<style scoped>
.menu .item {
    cursor: pointer;
    padding-left: 1em;
    padding-right: 1em;
    height: 1.8em;
    display: flex;
    align-items: center;
    border-radius: 4px;
}
.menu .item:hover {
    background-color: #2689e1;
}
.menu .item:not(:last-child) {
    margin-bottom: 0.2em;
}
</style>
