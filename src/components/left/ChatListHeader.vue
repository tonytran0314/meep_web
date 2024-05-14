<script setup>
    import router from '../../router'
    import axios from 'axios'
    import { ref } from 'vue'

    const showSettings = ref(false)
    const settingsDisplay = ref('none')

    const showSettingMenu = () => {
        showSettings.value = !showSettings.value

        settingsDisplay.value = showSettings.value ? 'block' : 'none'
    }

    const logout = async () => {
        try {
            localStorage.removeItem('api_token')                        // remove localStorage item
            await axios.post('http://127.0.0.1:8000/api/v1/logout')     // send post request to server to delete user token
            router.push('/login')                                       // redirect to login
        } catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <div id="chat_list_header">
        <div @click="showSettingMenu" id="avatar">
            <img src="/src/assets/images/huy.jpg" alt="my avatar">
            <div id="setting_menu">
                <ul>
                    <li>Settings</li>
                    <li @click="logout">Logout</li>
                </ul>
            </div>
        </div>
        <div id="search">
            <img src="/src/assets/images/search.png" alt="search icon">
            <input type="text" placeholder="Searching">
        </div>
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_list_header {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

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