<template>
    <div class="card">
        <div class="info">
            <div class="name">
                {{ room.name }}
            </div>
            <div class="footer">
                Made by
                <div class="author">
                    <UserAvatar :user="room.owner" :size="19" />
                    <span>{{ room.owner.username }}</span>
                </div>
            </div>
        </div>
        <div style="display: flex;">
            <button>
                <FontAwesomeIcon icon="play" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserAvatar from './User/Avatar.vue'

export default defineComponent({
    components: { UserAvatar },
    props: {
        room: { required: true },
    },
})
</script>

<style scoped>
.card {
    background: #2d2d2d;
    border-radius: 10px;
    padding: 1.125em;
    display: flex;
    justify-content: space-between;
    font-family: Roboto;
    cursor: pointer;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: space-between;
}

.name {
    font-size: 1.1em;
    /* font-weight: bold; */
    margin-bottom: 1em;
}

.footer {
    font-weight: bold;
    color: #606060;
    font-size: 0.9em;
    display: flex;
    align-items: center;
}

.author {
    color: #ccc;
    display: flex;
    align-items: center;
    margin-left: 0.6em;
}

.author .avatar {
    margin-right: 0.4em;
}

button {
    background: transparent;
    border: none;
    color: rgb(180, 180, 180);
    font-size: 1.2em;
    cursor: pointer;
    transition: 300ms;
}

.card:hover button {
    color: #fff;
}
</style>
