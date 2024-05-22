<script setup>
    import CurrentChatProfileSkeleton from './CurrentChatProfileSkeleton.vue'

    import {useRoute} from 'vue-router'
    import { watchEffect, ref } from 'vue'

    const route = useRoute()
    const showSkeleton = ref(true)
    const props = defineProps({
        currentChatName: String
    })

    const checkChatName = () => {
        // if get current chat name from the api, hide the skeleton
        if (props.currentChatName) {
            showSkeleton.value = false
        }
    }

    watchEffect(() => {
        checkChatName()
    })
</script>

<template>
    <div id="chat_header">
        <div>
            <div id="current_chat_avatar_name">
                <!-- <div id="current_chat_avatar">
                    <img src="/src/assets/images/huy.jpg" alt="avatar">
                </div> -->
                <h5>{{ props.currentChatName }}</h5>
            </div>
        <CurrentChatProfileSkeleton v-show="showSkeleton" />
        </div>
        <div id="call_methods">
            <div id="voice_call">
                <img src="/src/assets/images/Phone_fill.png" alt="voice call">
            </div>
            <div id="video_call">
                <img src="/src/assets/images/video_call.png" alt="video call">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_header {
        width: 100%;
        min-height: 4rem;
        border-radius: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;
        background-color: $boxColor;

        #current_chat_avatar_name {
            display: flex;
            gap: 1rem;
            align-items: center;
            color: $white;

            #current_chat_avatar {
                width: 2rem;
                height: 2rem;

                img {
                    width: inherit;
                    height: inherit;
                    border-radius: 50%;
                }
            }
        }

        #call_methods {
            display: flex;
            gap: 3rem;
            align-items: center;

            img {
                cursor: pointer;
            }
        }
    }
</style>