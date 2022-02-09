<template>
    <HomeLayout>
        <template v-slot:nav>
            <router-link class="item" to="/">
                Home
            </router-link>
            <router-link class="item loginBtn" :to="loginRoute">
                {{ loginLabel }}
            </router-link>
        </template>
        <template v-slot:content>
            <div class="left">
                <div class="slogan">
                    Enjoy your favorite things with your favorite people.
                </div>
                <router-link class="signInBtn" :to="loginRoute">
                    Start Watching
                </router-link>
            </div>
            <div class="right">
                test
            </div>
        </template>
    </HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AccountService } from 'account/account'
import HomeLayout from '~/layouts/HomeLayout.vue'

export default defineComponent({
    components: {
        HomeLayout,
    },
    computed: {
        isLoggedIn(): boolean {
            return AccountService.isLoggedIn()
        },
        loginRoute(): string {
            return this.isLoggedIn ? 'app' : 'login'
        },
        loginLabel(): string {
            return this.isLoggedIn ? 'Open' : 'Login'
        },
    },
})
</script>

<style scoped>
.item {
    padding: 0.35em 0;
    font-size: 1em;
    border: 3px solid transparent;
    border-top: 0;
    border-right: 0;
}

.loginBtn {
    background: #cb4164;
    border-color: #9e2343;
    border-radius: 4px;
    padding: 0.35em 0.7em;
    color: #fff;
    font-family: Roboto;
    font-weight: 500;
    font-weight: bold;
    cursor: pointer;
    transition: 300ms;
}

.loginBtn:hover {
    background: #b03b59;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content .left,
.content .right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 50%;
}

.content .left {
    font-size: 1.8em;
}

.content .right {
    align-items: center;
}

.slogan {
    font-weight: 900;
    font-family: Arial;
    margin-bottom: 1.6em;
}

.signInBtn {
    font-size: 0.9em;
    font-weight: 300;
    text-transform: lowercase;
    padding-bottom: 0.3em;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-bottom: 2px solid #fff;
    transition: 300ms;
}

.signInBtn:hover {
    color: #ec4d75;
    border-color: #ec4d75;
}
</style>
