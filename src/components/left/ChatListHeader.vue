<script setup>

    import ProfileModal from './modals/ProfileModal.vue'
    import LogoutModal from './modals/LogoutModal.vue'

    import router from '../../router'
    import axios from 'axios'
    import { ref, onMounted } from 'vue'

    const showSettings = ref(false)
    const settingsDisplay = ref('none')
    const isProfileModalOpen = ref(false)
    const isLogoutModalOpen = ref(false)
    const avatar = ref(null)

    const toggleSettingMenu = () => {
        showSettings.value = !showSettings.value

        settingsDisplay.value = showSettings.value ? 'block' : 'none'
    }

    const openProfile = () => {
        toggleSettingMenu()
        isProfileModalOpen.value = true
    }

    const closeProfile = () => {
        isProfileModalOpen.value = false
    }

    const openLogoutConfirm = () => {
        toggleSettingMenu()
        isLogoutModalOpen.value = true
    }

    const closeLogoutConfirm = () => {
        isLogoutModalOpen.value = false
    }

    const getAvatar = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/v1/my_profile')
            assignAvatar(res.data.data.avatar)
        } catch (error) {
            if (error.response) {
                catchError(error)
            }
        }
    }

    const assignAvatar = (avatarUrl) => {
        const domain = import.meta.env.VITE_API_DOMAIN
        const port = import.meta.env.VITE_API_PORT
        const url = domain + ':' + port
        avatar.value = url + avatarUrl
    } 

    onMounted(() => {
        getAvatar()
    })
</script>

<template>
    <div id="chat_list_header">
        <div id="avatar">
            <img @click="toggleSettingMenu" :src="avatar" alt="my avatar">
            <div id="setting_menu">
                <ul>
                    <li @click="openProfile">
                        <font-awesome-icon :icon="['fas', 'user']" />
                        <p>Profile</p>
                    </li>
                    <li>
                        <font-awesome-icon :icon="['fas', 'user']" />
                        <p>Friends</p>
                    </li>
                    <li @click="openLogoutConfirm">
                        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                        <p>Logout</p>
                    </li>
                </ul>
            </div>
        </div>
        <div id="search">
            <font-awesome-icon 
                :icon="['fas', 'magnifying-glass']"
                style="color: #5D6E7F;" />
            <input type="text" placeholder="Searching (ex: username#0000)">
        </div>
        <ProfileModal v-show="isProfileModalOpen" @closeModalClick="closeProfile" />
        <LogoutModal v-show="isLogoutModalOpen" @closeModalClick="closeLogoutConfirm" />
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_list_header {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 0 1rem;

        #avatar {
            position: relative;
            img {
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                cursor: pointer;
            }

            #setting_menu {
                position: absolute;
                padding: 1rem;
                border-radius: .5rem;
                border-top-left-radius: 0;
                display: v-bind('settingsDisplay');
                background-color: $secondaryButton;
                color: $white;
                ul {
                    display: flex;
                    flex-direction: column;
                    gap: .5rem;
                    li {
                        list-style: none;
                        cursor: pointer;
                        padding: 0.5rem 1.5rem 0.5rem 1rem;
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        border-radius: .5rem;

                        &:hover {
                            background-color: $boxColor;
                        }
                    }
                }
            }
        }
        #search {
            width: 100%;
            height: 2.5rem;
            border-radius: 1.5rem;
            display: flex;
            gap: 0.75rem;
            align-items: center;
            padding-left: 1rem;
            background-color: $baseColor;

            img {
                width: 1.5rem;
                height: 1.5rem;
            }

            input {
                border: none;
                width: 100%;
                height: 100%;
                padding-right: 1rem; 
                border-top-right-radius: 1.5rem;
                border-bottom-right-radius: 1.5rem;
                @include text();
                color: $white;
                background-color: $baseColor;

                &:focus {
                    outline: none;
                }

                &::placeholder {
                    color: $darkLabel;
                    @include text();
                }
            }
        }
    }

</style>