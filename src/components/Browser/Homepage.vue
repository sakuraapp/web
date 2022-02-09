<template>
    <div class="home">
        <div class="searchbar">
            <input
                type="text"
                v-model="address"
                @keyup.enter="navigate(address)"
            />
            <button @click="navigate(address)">
                <FontAwesomeIcon icon="search" />
            </button>
        </div>
        <div class="sites">
            <div
                class="site"
                v-for="site in sites"
                :key="site.url"
                @click="navigate(site.url)"
            >
                <div class="icon">
                    <img :src="site.icon" :style="{ height: site.height }" />
                </div>
                <div class="title">
                    {{ site.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YouTubeIcon from '~/assets/icons/yt_icon_rgb.png'
import TwitchIcon from '~/assets/icons/Twitch.png'
import NetflixIcon from '~/assets/icons/Netflix.png'
import CrunchyrollIcon from '~/assets/icons/Crunchyroll.png'

export default defineComponent({
    data() {
        return {
            address: '',
            sites: [
                {
                    title: 'YouTube',
                    icon: YouTubeIcon,
                    url: 'https://youtube.com',
                    height: '75%',
                },
                {
                    title: 'Twitch',
                    icon: TwitchIcon,
                    url: 'https://twitch.tv',
                },
                {
                    title: 'Netflix',
                    icon: NetflixIcon,
                    url: 'https://www.netflix.com/browse',
                },
                {
                    title: 'Crunchyroll',
                    icon: CrunchyrollIcon,
                    url: 'https://www.crunchyroll.com/videos/anime',
                },
            ],
        }
    },
    emits: ['navigate'],
    methods: {
        navigate(url: string) {
            this.$emit('navigate', url)
        },
    },
})
</script>

<style scoped>
.home {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.searchbar {
    display: flex;
    min-width: 50%;
    background: rgb(50, 50, 50);
    border-radius: 50px;
    overflow: hidden;
}

.searchbar input,
.searchbar button {
    background: transparent;
    border: 0;
}

.searchbar input {
    margin-right: 0.4em;
    font-size: 0.8em;
    padding: 0.8em 1em 0.8em 1em;
    flex-grow: 1;
    outline: none;
    color: #fff;
    font-family: Source Sans Pro;
}

.searchbar button {
    background: rgb(60, 60, 60);
    width: 2.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    color: #fff;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: normal;
}

.sites {
    margin-top: 2.5em;
    display: flex;
    flex-wrap: wrap;
    margin-right: -2.4em;
}

.site {
    margin-right: 2.4em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.site .icon {
    margin-bottom: 0.8em;
    border-radius: 50%;
    width: 5em;
    height: 5em;
    overflow: hidden;
    padding: 1em;
    background-color: rgb(45, 45, 45);
    display: flex;
    align-items: center;
}
.site .icon img {
    width: 100%;
    height: 100%;
}
.site .title {
    font-family: Roboto;
}
</style>
