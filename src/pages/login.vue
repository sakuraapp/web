<template>
    <HomeLayout>
        <template v-slot:content>
            <div class="box">
                <h2>Login</h2>
                <div class="providers">
                    <a
                        class="provider"
                        v-for="provider in providers"
                        :key="provider.id"
                        :href="getLoginUrl(provider.id)"
                    >
                        <div class="icon">
                            <img :src="provider.icon" />
                        </div>
                        <div class="label">Login with {{ provider.name }}</div>
                    </a>
                </div>
            </div>
        </template>
    </HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AccountService } from '~/account/account'
import HomeLayout from '~/layouts/HomeLayout.vue'
import DiscordIcon from '~/assets/icons/Discord-Logo-White.png'

export default defineComponent({
    components: { HomeLayout },
    data() {
        return {
            providers: [
                {
                    id: 'discord',
                    name: 'Discord',
                    icon: DiscordIcon,
                },
            ],
        }
    },
    methods: {
        getLoginUrl(provider: string) {
            return AccountService.getLoginUrl(provider)
        },
    },
})
</script>

<style scoped>
.box {
    padding: 1.4em 1.8em;
    background-color: rgb(40, 40, 40);
    width: 50%;
    border-radius: 8px;
}

h2 {
    margin: 0;
    margin-bottom: 0.6em;
}

.providers {
    display: flex;
    flex-direction: column;
}

.provider {
    width: 100%;
    background: rgb(55, 55, 55);
    border: 0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6em 25%;
    cursor: pointer;
}

.provider .icon {
    width: 2em;
    height: 2em;
}

.provider img {
    width: 100%;
    height: 100%;
}

.provider .label {
    font-size: 1.1em;
    font-weight: bold;
}
</style>
