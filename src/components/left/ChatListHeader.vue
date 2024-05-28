<script setup>

    import ProfileModal from './modals/ProfileModal.vue'
    import LogoutModal from './modals/LogoutModal.vue'
    import FriendsModal from './modals/FriendsModal.vue'

    import axios from 'axios'
    import { ref, onMounted } from 'vue'

    const showSettings = ref(false)
    const settingsDisplay = ref('none')
    const isProfileModalOpen = ref(false)
    const isFriendsModalOpen = ref(false)
    const isLogoutModalOpen = ref(false)
    const avatar = ref(null)
    const emit = defineEmits(['gotAvatar'])

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

    const openFriends = () => {
        toggleSettingMenu()
        isFriendsModalOpen.value = true
    }

    const closeFriends = () => {
        isFriendsModalOpen.value = false
    }

    const getAvatar = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/v1/my_profile')
            assignAvatar(res.data.data.avatar)
            emit('gotAvatar')
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
                    <li @click="openFriends">
                        <font-awesome-icon :icon="['fas', 'user-group']" />
                        <p>Friends</p>
                    </li>
                    <li @click="openLogoutConfirm">
                        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                        <p>Logout</p>
                    </li>
                </ul>
            </div>
        </div>
        <ProfileModal v-show="isProfileModalOpen" @closeModalClick="closeProfile" />
        <LogoutModal v-show="isLogoutModalOpen" @closeModalClick="closeLogoutConfirm" />
        <FriendsModal v-show="isFriendsModalOpen" @closeModalClick="closeFriends" />
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_list_header {
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
                box-shadow: 0 1rem 1rem 1rem rgba(0, 0, 0, 0.3);
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
    }

</style>