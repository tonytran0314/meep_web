<script setup>
    import { onClickOutside } from '@vueuse/core'
    import { ref } from 'vue'

    const modal = ref(null)
    const emit = defineEmits(['closeModalClick'])

    onClickOutside(modal, () => {
        closeModal()
    })

    const closeModal = () => {
        emit('closeModalClick')
    }
</script>

<template>
    <Transition name="modal">
        <div class="modal_bg">
            <div class="modal" ref="modal">
                <button @click="closeModal" class="close_btn"><font-awesome-icon :icon="['fas', 'x']" /></button>
                Click outside to close this
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
            padding: 50px 100px;
            border-radius: 5px;
            box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
            background-color: $boxColor;

            .close_btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                cursor: pointer;
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
        transform: scale(1.1);
    }
</style>