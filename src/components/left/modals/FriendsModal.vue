<script setup>
    import { onClickOutside } from '@vueuse/core'
    import { ref } from 'vue'
    
    const modal = ref(null)
    const emit = defineEmits(['closeModalClick'])
    
    const closeModal = () => {
        emit('closeModalClick')
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
                
                <div id="search">
                    <font-awesome-icon 
                        :icon="['fas', 'magnifying-glass']"
                        style="color: #5D6E7F;" />
                    <input type="text" placeholder="Searching username#0000">
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
            background-color: $boxColor;

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
                    background-color: $baseColor;
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