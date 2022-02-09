<template>
    <div class="card">
        <Profile :user="user" :avatarSize="48" fontSize="1.1em" />
        <button>
            <FontAwesomeIcon icon="cog" />
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Profile from './Profile.vue'

export default defineComponent({
    components: {
        Profile,
    },
    computed: mapGetters({ user: 'session/user' }),
})
</script>

<style scoped>
.card {
    background: rgb(60, 60, 60);
    padding: 0.8em;
    border-radius: 8px;
    width: 90%;
    display: flex;
    justify-content: space-between;
}

button {
    padding: 0 0.5em;
    background: transparent;
    border: none;
    font-size: 1.4em;
    color: #b4b4b4;
    border-radius: 4px;
    cursor: pointer;
    transition: 300ms;
}

button:hover {
    background: rgba(150, 150, 150, 0.3);
}
</style>
