<template>
    <div class="searchbar reverse">
        <div class="icon">
            <FontAwesomeIcon icon="search" />
        </div>
        <input type="text" placeholder="Search for rooms or people..." />
    </div>
</template>

<style scoped>
.searchbar {
    background: #414141;
    border: 1px solid rgb(30, 30, 30);
    border-radius: 8px;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.searchbar.reverse {
    flex-direction: row-reverse;
}

.searchbar .icon {
    padding: 0 1.2em;
    color: #cecece;
}

input {
    flex-grow: 1;
    border: 0;
    background: transparent;
    font-family: Roboto;
    font-size: 1.15em;
    font-weight: 300;
    padding: 0.8em 0.2em;
    color: #fff;
}

.searchbar.reverse input {
    padding-left: 1.2em;
    padding-right: 1.2em;
}

input::placeholder {
    color: #cecece;
}
</style>
