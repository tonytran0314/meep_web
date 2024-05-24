<script setup>
    import { onClickOutside } from '@vueuse/core'
    import { ref } from 'vue'
    import { useToast } from "vue-toastification"

    const toast = useToast()
    const modal = ref(null)
    const emit = defineEmits(['closeModalClick'])

    onClickOutside(modal, () => {
        closeModal()
    })

    const closeModal = () => {
        emit('closeModalClick')
    }

    const copyUsername = (username) => {
        navigator.clipboard.writeText(username)
        toast.success('Copied Username Successfully')
    }
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
                            <img src="/src/assets/images/huy.jpg" alt="avatar">
                        </div>
                        <div id="user_info">
                            <div class="field" id="username_field">
                                <label>Username:</label>
                                <input type="text" value="user1#3847" disabled>
                                <span @click="copyUsername('user1#3847')"><font-awesome-icon :icon="['fas', 'copy']" /></span>
                            </div>
                            <div class="field" id="display_name_field">
                                <label for="display_name">Display Name:</label>
                                <input type="text" name="display_name" id="display_name" value="User 1">
                            </div>
                            <div class="field" id="email_field">
                                <label for="email">Email:</label>
                                <input type="text" name="email" id="email" value="email@example.com">
                            </div>
                            <!-- Password (change password feature) -->
                        </div>
                    </div>
                    
                    <div id="actions">
                        <button id="cancel_button">Cancel</button>
                        <button id="save_button">Save</button>
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
                        img {
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

                        .field {
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