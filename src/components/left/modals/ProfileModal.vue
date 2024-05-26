<script setup>
    import { onClickOutside } from '@vueuse/core'
    import { ref, reactive, onMounted } from 'vue'
    import { useToast } from "vue-toastification"
    import axios from 'axios'
    import Spinner from '../../Spinner.vue'

    const toast = useToast()
    const modal = ref(null)
    const loading = ref(false)
    const emit = defineEmits(['closeModalClick'])

    const displayName = reactive({
        'vmodel': null,
        'error': null
    })
    const email = reactive({
        'vmodel': null,
        'error': null
    })

    const username = ref(null)
    const avatar = ref(null)

    onClickOutside(modal, () => {
        closeModal()
    })

    const getProfile = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/v1/my_profile')
            assignDisplayName(res.data.data.displayName)
            assignEmail(res.data.data.email)
            assignUsername(res.data.data.username + '#' + res.data.data.identifyNumber)
            assignAvatar(res.data.data.avatar)
        } catch (error) {
            if (error.response) {
                catchError(error)
            }
        }
    }

    const assignDisplayName = (display_name) => {
        displayName.vmodel = display_name
    }

    const assignEmail = (email_address) => {
        email.vmodel = email_address
    }

    const assignUsername = (user_name) => {
        username.value = user_name
    }

    const assignAvatar = (avatarUrl) => {
        const domain = import.meta.env.VITE_API_DOMAIN
        const port = import.meta.env.VITE_API_PORT
        const url = domain + ':' + port
        avatar.value = url + avatarUrl
    } 

    const closeModal = () => {
        emit('closeModalClick')
    }

    const closeModalWithEvent = (event) => {
        event.preventDefault()
        closeModal()
    }

    const copyUsername = (username) => {
        navigator.clipboard.writeText(username)
        toast.success('Copied Username Successfully')
    }
    
    const saveProfile = (event) => {
        event.preventDefault()

        displayName.error = displayNameValidation(displayName.vmodel)
        email.error = emailValidation(email.vmodel)

        if( displayName.error === null && email.error === null) {
                const updatedProfile = {
                    display_name: displayName.vmodel,
                    email: email.vmodel
                }
                loading.value = true
                sendRequest(updatedProfile)
        }
    }

    const sendRequest = async (updatedProfile) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/v1/update_profile', updatedProfile)
            closeModal()
            toast.success('Updated Profile Successfully')
        } catch (error) {
            if (error.response) {
                catchError(error.response.data.message)
            }
        }
    }
    
    // re-usable
    // allow Vietnamese
    const displayNameValidation = (displayName) => {
        
        const displayNameRules = /^[a-zA-Z0-9_-\s]+$/
        
        let message = null

        if(isEmpty(displayName)) { return 'The display name cannot be empty' }
        if(invalidChars(displayName, displayNameRules)) { return 'The display name is invalid' }

        return message
    }
    
    const emailValidation = (email) => {
        //eslint-disable-next-line
        const emailRules = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        let message = null

        if(isEmpty(email)) { return 'The email cannot be empty' }
        if(invalidChars(email, emailRules)) { return 'The email is invalid' }

        return message
    }

    const isEmpty = (string) => (string === '' || string === null)
    const invalidChars = (string, rules) => !string.match(rules)

    onMounted(() => {
        getProfile()
    })
</script>

<template>
    <Transition name="modal">
        <div class="modal_bg">
            <div class="modal" ref="modal">
                <button @click="closeModal" class="close_btn"><font-awesome-icon :icon="['fas', 'x']" /></button>
                
                <form>
                    <h3>Profile</h3>
                    <div id="form_body">
                        <div id="avatar">
                            <img :src="avatar" alt="avatar">
                        </div>
                        <div id="user_info">
                            <div class="field" id="username_field">
                                <div class="content">
                                    <label>Username:</label>
                                    <input type="text" :value="username" disabled>
                                    <span @click="copyUsername(username)"><font-awesome-icon :icon="['fas', 'copy']" /></span>
                                </div>
                            </div>
                            <div class="field" id="display_name_field">
                                <div class="content">
                                    <label for="display_name">Display Name:</label>
                                    <input v-model="displayName.vmodel" type="text" name="display_name" id="display_name" value="User 1">
                                </div>
                                <span class="error">{{ displayName.error }}</span>
                            </div>
                            <div class="field" id="email_field">
                                <div class="content">
                                    <label for="email">Email:</label>
                                    <input v-model="email.vmodel" type="text" name="email" id="email" value="email@example.com">
                                </div>
                                <span class="error">{{ email.error }}</span>
                            </div>
                            <!-- Password (change password feature) -->
                        </div>
                    </div>
                    
                    <div id="actions">
                        <button @click="closeModalWithEvent" id="cancel_button">Cancel</button>
                        <button @click="saveProfile" id="save_button">
                            <Spinner v-if="loading" />
                            <span v-else>Save</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    .modal_bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100dvh;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99;
        
        .modal {
            position: relative;
            padding: 3rem 6rem;
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
            background-color: $baseColor;

            .close_btn {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 50%;
                padding: 1.5rem;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                background: none;
                transition: .2s;

                &:hover {
                    background-color: $boxColor;
                }
            }

            form {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 3rem;

                #form_body {
                    display: inherit;
                    gap: 3rem;
                    flex-wrap: wrap;
                    justify-content: center;

                    #avatar {
                        width: 16rem;
                        height: 16rem;

                        img {
                            width: inherit;
                            height: inherit;
                            border-radius: 50%;
                        }
                    }

                    #user_info {
                        display: inherit;
                        flex-direction: column;
                        gap: 1.5rem;

                        input {
                            border: none;
                            background-color: $boxColor;
                            padding: 0.5rem 1rem;
                            border-radius: 0.5rem;
                            @include text();

                            &:focus {
                                outline: none;
                            }
                        }
                        
                        .error {
                            color: $red;
                        }

                        .field {
                            display: flex;
                            flex-direction: column;

                            .content {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                gap: 1.5rem;
                                position: relative;

                                span {
                                    position: absolute;
                                    right: 1rem;
                                    cursor: pointer;
                                }
                            }

                        }
                    }
                }
                
                #actions {
                    display: inherit;
                    justify-content: flex-end;
                    gap: 1rem;
                    width: 100%;

                    button {
                        padding: 0.5rem 1rem;
                        border-radius: 0.5rem;
                        border: none;
                        cursor: pointer;
                        @include text();
                    }

                    #save_button {
                        background-color: $blue;
                    }
                }
            }
        }
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: all 0.25s ease;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
        transform: scale(1);
    }
</style>