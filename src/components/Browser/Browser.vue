<template>
    <div class="browser">
        <div class="content" v-if="!url">
            <slot />
            <div class="addressBar">
                <input
                    type="text"
                    placeholder="Type a URL"
                    v-model="address"
                    @keyup.enter="navigateToAddress"
                />
                <button @click="addToQueue(true)">
                    <FontAwesomeIcon icon="plus-circle" />
                </button>
            </div>
            <div class="sites">
                <div
                    class="site"
                    v-for="site in sites"
                    :key="site.title"
                    @click="navigate(site.url)"
                >
                    <div class="icon">
                        <img
                            :src="site.icon"
                            :style="{ height: site.height }"
                        />
                    </div>
                    <div class="title">
                        {{ site.title }}
                    </div>
                </div>
            </div>
        </div>
        <div class="body" v-show="url">
            <div class="addressBar">
                <div class="buttons">
                    <button @click="goBack" :disabled="!canGoBack">
                        <FontAwesomeIcon icon="arrow-left" />
                    </button>
                    <button @click="goForward" :disabled="!canGoForward">
                        <FontAwesomeIcon icon="arrow-right" />
                    </button>
                    <button @click="refresh">
                        <FontAwesomeIcon icon="redo" />
                    </button>
                </div>
                <div class="input">
                    <input
                        type="text"
                        v-model="address"
                        @keypress.enter="navigateToAddress"
                    />
                </div>
                <div class="btn">
                    <button @click="addToQueue">
                        <FontAwesomeIcon icon="plus" />
                        <span>Queue</span>
                    </button>
                </div>
                <div class="btn" v-if="isPopup">
                    <button @click="close">
                        <FontAwesomeIcon icon="times" />
                    </button>
                </div>
            </div>
            <Webview :src="src" ref="webview" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Webview from '../Webview.vue'

export default Vue.extend({
    props: ['isPopup'],
    components: {
        Webview,
    },
    methods: {
        navigate(url: string, appendForward = false, changeSrc = true) {
            if (this.url) {
                const target = appendForward
                    ? this.history.forward
                    : this.history.back

                if (target[target.length - 1] !== this.url) {
                    target.push(this.url)
                }
            }

            this.url = url
            this.address = url

            if (changeSrc !== false) {
                this.src = url
            }
        },
        navigateToAddress() {
            this.navigate(this.address, false, this.address.length > 0)
        },
        goBack() {
            if (this.canGoBack) {
                this.navigate(this.history.back.pop(), true)
            }
        },
        goForward() {
            if (this.canGoForward) {
                this.navigate(this.history.forward.pop(), false)
            }
        },
        refresh() {
            const src = this.src

            this.src = ''

            this.$nextTick(() => {
                this.src = src
            })
        },
        addToQueue(useAddress = false) {
            const url = useAddress ? this.address : this.url

            if (!url) return

            this.$store.dispatch('queueAdd', url)

            if (this.isPopup) {
                this.close()
            }
        },
        close() {
            this.$emit('close')
        },
    },
    mounted() {
        if (this.url) {
            this.navigate(this.url, false, false)
        }

        this.unwatch = this.$watch(
            '$refs.webview.currentURL',
            (value: string) => {
                if (value !== this.url) {
                    this.navigate(value, false, false)
                }
            }
        )
    },
    beforeDestroy() {
        this.unwatch()
    },
    computed: {
        canGoBack() {
            return this.history.back.length > 0
        },
        canGoForward() {
            return this.history.forward.length > 0
        },
    },
    data() {
        return {
            url: '',
            src: '',
            address: '',
            history: {
                back: [],
                forward: [],
            },
            sites: [
                {
                    title: 'YouTube',
                    icon: require('~/assets/icons/yt_icon_rgb.png'),
                    url: 'https://youtube.com',
                    height: '75%',
                },
                {
                    title: 'Twitch',
                    icon: require('~/assets/icons/Twitch.png'),
                    url: 'https://twitch.tv',
                },
                {
                    title: 'Netflix',
                    icon: require('~/assets/icons/Netflix.png'),
                    url: 'https://netflix.com',
                },
                {
                    title: 'Crunchyroll',
                    icon: require('~/assets/icons/Crunchyroll.png'),
                    url: 'https://crunchyroll.com',
                },
            ],
        }
    },
})
</script>

<style scoped>
.browser {
    flex-grow: 1;
    font-size: 1.8em;
    background-color: rgba(49, 49, 49, 0.7);
    position: relative;
}
.browser .addressBar button,
.browser .addressBar input {
    outline: none;
}
.browser .sakuraLogo {
    font-size: 2em;
    margin-bottom: 0.8em;
}
.browser iframe {
    width: 100%;
}
.browser .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.sites {
    display: flex;
    flex-wrap: wrap;
    margin-right: -2.4em;
}
.site {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 2.4em;
    cursor: pointer;
}
.site .icon {
    margin-bottom: 0.8em;
    border-radius: 50%;
    width: 100px;
    height: 100px;
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

.browser .content .addressBar {
    margin-bottom: 2em;
    width: 45%;
    display: flex;
    --address-bar-border: #e9b1cd;
}
.browser .content .addressBar input {
    background-color: rgb(35, 35, 35);
    font-size: 0.8em;
    padding: 0.8em 1em 0.8em 1em;
    border: 0;
    border-radius: 50px;
    flex-grow: 1;
    outline: none;
    color: #fff;
    /* border: 2px solid var(--address-bar-border); */
    font-family: Source Sans Pro;
}
.browser .content .addressBar button {
    width: 7vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 50%;
    background-color: rgb(35, 35, 35);
    /* border: 2px solid var(--address-bar-border); */
    /* color: #e9b1cd; */
    color: #fff;
    margin-left: 0.4em;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: normal;
}

.browser .body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.body .addressBar {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
}
.body .addressBar .buttons,
.body .addressBar .input,
.body .addressBar .btn {
    display: flex;
    align-items: center;
}

.body .addressBar .buttons button {
    background: transparent;
    border: 0;
    color: rgb(200, 200, 200);
    font-size: 0.8em;
    padding: 0.6em;
    cursor: pointer;
}
.body .addressBar .buttons button:disabled {
    cursor: default;
    color: rgb(105, 105, 105);
}

.body .addressBar .input {
    flex-grow: 1;
    padding: 0.6em;
    background-color: rgb(40, 40, 40);
}
.body .addressBar .input input {
    width: 100%;
    background: transparent;
    border: 0;
    color: #fff;
    font-size: 0.7em;
    /* font-family: Roboto;
    font-weight: 300; */
}

.body .addressBar .btn button {
    font-size: 0.8em;
    background: transparent;
    border: 0;
    padding: 0.8em;
    color: #fff;
    color: rgb(125, 125, 125);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 3.5em;
    cursor: pointer;
}
.body .addressBar .btn svg:not(:last-child),
.body .addressBar .btn .icon:not(:last-child) {
    margin-right: 0.4em;
}
</style>
