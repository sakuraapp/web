<template>
    <div class="label">
        <slot />
    </div>
</template>

<style scoped>
.label {
    font-family: 'Roboto Condensed';
    font-size: 1.1em;
    text-transform: uppercase;
    /* font-weight: bold; */
    color: rgb(200, 200, 200);
    margin-bottom: 0.7em;
}
</style>
