<template>
    <div class="container">
        <div class="header">
            Complete your Registration
        </div>
        <div class="error" v-if="errors.form">
            {{ errors.form }}
        </div>
        <div class="items">
            <Item label="Avatar" type="custom" :error="errors.avatar">
                <AvatarPicker :value="form.avatar" @change="onAvatarChange" />
            </Item>
            <Item
                label="Username"
                :value="form.username"
                :error="errors.username"
                @change="onUsernameChange"
            />
        </div>
        <div class="footer">
            <button class="submitBtn" @click="submit">
                Finish
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Item from './Item.vue'
import AvatarPicker from '~/components/AvatarPicker.vue'
import { AxiosError } from 'axios'
import { convertURLtoFile } from '~/helpers/util'

const FIELD_REQUIRED = 'This field is required.'

export default defineComponent({
    components: {
        Item,
        AvatarPicker,
    },
    props: {
        username: String,
        avatar: String,
    },
    data() {
        return {
            busy: false,
            form: {
                username: this.username,
                avatar: null,
            },
            errors: {
                form: null,
                username: null,
                avatar: null,
            },
        }
    },
    methods: {
        onAvatarChange(avatar: File) {
            this.form.avatar = avatar
        },
        onUsernameChange(username: string) {
            this.form.username = username

            if (!username) {
                this.errors.username = FIELD_REQUIRED
            } else {
                this.errors.username = null
            }
        },
        async submit(): Promise<void> {
            if (this.busy) return

            if (!this.form.username) {
                this.errors.username = FIELD_REQUIRED

                return
            }

            this.busy = true
            this.errors.form = null

            const form = new FormData()

            form.append('username', this.form.username)
            form.append('avatar', this.form.avatar)

            try {
                const res = await this.axios.post('/auth/complete', form, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                })

                const { token } = res.data

                if (token) {
                    this.$store.dispatch('session/saveToken', token)

                    const nextUrl = <string>this.$route.params.nextUrl

                    this.$router.push(nextUrl || { name: 'app' })
                }
            } catch (error) {
                const err = error as AxiosError

                switch (err.response.status) {
                    case 403:
                        this.errors.form =
                            'Your session has expired. Please try signing in again.'
                        break
                    case 409:
                        this.errors.username =
                            'There are too many users with this username. Please choose a different one.'
                        break
                    case 400:
                    case 500:
                        this.errors.form = 'An error occured. Please try again.'
                }
            }

            this.busy = false
        },
    },
    async mounted() {
        if (this.avatar) {
            this.form.avatar = await convertURLtoFile(this.avatar)
        }
    },
})
</script>

<style scoped>
.container {
    flex-grow: 1;
}

.header {
    font-family: Roboto;
    font-weight: bold;
    font-size: 1.4em;
    /* text-align: center; */
    margin-bottom: 1.6em;
}

.items {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.8em;
}

.error {
    background: #c43232;
    color: #f1bbbb;
    padding: 1em;
    border-radius: 6px;
    font-size: 0.9em;
    margin-bottom: 1em;
}

.footer {
    margin-top: 1.2em;
    display: flex;
    justify-content: flex-end;
}

.submitBtn {
    background: transparent;
    border: 1px solid #d485ad;
    border-radius: 50px;
    /* color: #e9b1cd; */
    color: #fff;
    background: #d485ad;
    padding: 0.8em;
    font-size: 0.8em;
    font-weight: bold;
    font-family: Roboto;
    cursor: pointer;
    min-width: 25%;
    transition: 300ms;
}

.submitBtn:hover {
    color: #d485ad;
    background: rgb(50, 50, 50);
    /* background: transparent; */
}
</style>
