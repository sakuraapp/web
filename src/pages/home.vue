<template>
    <div class="container">
        <div class="content">
            <Logo />
            <div class="middle">
                <div class="slogan">
                    Watch stuff with your friends.
                </div>
                <div class="btns" v-if="!isLoggedIn">
                    <a
                        v-for="provider in providers"
                        :key="provider.name"
                        :href="provider.url"
                    >
                        <button
                            :class="{
                                btn: true,
                                [provider.name.toLowerCase()]: true,
                            }"
                        >
                            <img :src="provider.icon" />
                            Login with {{ provider.name }}
                        </button>
                    </a>
                </div>
                <button class="btn open" @click="openApp" v-else>Open</button>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="side"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AccountService from '~/account/account'
import Logo from '~/components/Logo.vue'

export default Vue.extend({
    components: {
        Logo,
    },
    data() {
        return {
            isLoggedIn: false,
            providers: [
                {
                    name: 'Discord',
                    url: AccountService.loginUrl,
                    icon:
                        'https://discordapp.com/assets/28174a34e77bb5e5310ced9f95cb480b.png',
                },
            ],
        }
    },
    methods: {
        openApp() {
            this.$router.push({ name: 'app' })
        },
    },
    async mounted() {
        this.isLoggedIn = await AccountService.isLoggedIn()
    },
})
</script>

<style scoped>
.container {
    display: flex;
    width: 100%;
    height: 100%;
    background: #1d1d1d;
    font-size: 1.143em;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}

.container .content,
.container .side {
    flex: 1;
}

.container .content {
    padding: 1.2em 1.4em;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

.container .middle {
    align-self: center;
    text-align: center;
}

.container .slogan {
    font-weight: 900;
    font-size: 1.8em;
    /* border-bottom: 4px solid #fff; */
    margin-bottom: 1.6em;
    font-family: Arial;
}

.container .side {
    background-image: url('~/assets/sakura.jpg');
    background-size: cover;
    background-position: center;
    filter: grayscale(40%);
}

.btns {
    display: flex;
    flex-direction: column;
    margin-bottom: -1em;
}

.btn {
    padding: 0.6em 1em;
    font-size: 0.9em;
    font-weight: 500;
    border-radius: 4px;
    border: 0;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    margin-bottom: 1em;
}
.btn.open {
    background-color: #f27878;
    font-size: 1.1em;
}
.btn.discord {
    background-color: #7389da;
}

.btn img {
    width: 24px;
    height: 24px;
    margin-right: 1em;
}

.sakuraLogo {
    justify-content: flex-start;
}
</style>
