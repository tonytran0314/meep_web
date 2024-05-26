<script setup>
    import { onClickOutside } from '@vueuse/core'
    import { ref } from 'vue'
    import axios from 'axios'
    import router from '../../../router'
    import Spinner from '../../Spinner.vue'
    
    const modal = ref(null)
    const loading = ref(false)
    const emit = defineEmits(['closeModalClick'])
    
    const closeModal = () => {
        emit('closeModalClick')
    }

    const closeModalWithEvent = (event) => {
        event.preventDefault()
        closeModal()
    }

    const logout = async () => {
        try {
            loading.value = true
            localStorage.removeItem('api_token')                        // remove localStorage item
            await axios.post('http://127.0.0.1:8000/api/v1/logout')     // send post request to server to delete user token
            router.push('/login')                                       // redirect to login
        } catch (error) {
            console.log(error)
        }
    }

    onClickOutside(modal, () => {
        closeModal()
    })
</script>

<template>
    <Transition name="modal">
        <div class="modal_bg">
            <div class="modal" ref="modal">
                <button @click="closeModal" class="close_btn"><font-awesome-icon :icon="['fas', 'x']" /></button>
                
                <div id="modal_content">
                    <h3>Logout</h3>

                    <p>Are you sure you want to logout ?</p>
                    
                    <div id="actions">
                        <button @click="closeModalWithEvent" id="cancel_button">Cancel</button>
                        <button @click="logout" id="logout_button">
                            <Spinner v-if="loading" />
                            <span v-else>Logout</span>
                        </button>
                    </div>
                </div>
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
            padding: 2rem 4rem;
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
            background-color: $baseColor;

            #modal_content {
                display: flex;
                flex-direction: column;
                gap: 2.5rem;
            }

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

            #actions {
                display: inherit;
                justify-content: center;
                gap: 1rem;
                width: 100%;

                button {
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    @include text();
                }

                #logout_button {
                    background-color: $red;
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