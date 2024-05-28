<script setup>
    import {useRoute} from 'vue-router'
    import { watchEffect, reactive, onMounted } from 'vue'
    import axios from 'axios'

    const route = useRoute()
    const chatRoom = reactive({
        avatar: null,
        name: null
    })
    
    const getChatRoomHeader = async (id) => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/v1/conversation/' + id)
            fecthData(res.data.data)
        } catch (error) {
            throw(error)
        }
    }

    const avatarUrl = (avatar) => {
        const domain = import.meta.env.VITE_API_DOMAIN
        const port = import.meta.env.VITE_API_PORT
        const url = domain + ':' + port
        
        return url + avatar
    }

    const fecthData = (data) => {
        chatRoom.avatar = avatarUrl(data.avatar)
        chatRoom.name = data.name
    }

    onMounted(() => {
        getChatRoomHeader(route.params.conversationId)
    })

    watchEffect(() => {
        getChatRoomHeader(route.params.conversationId)
    })
</script>

<template>
    <div id="chat_header">
        <div id="current_chat_avatar_name">
            <div id="current_chat_avatar">
                <img :src="chatRoom.avatar" alt="avatar">
            </div>
            <h5>{{ chatRoom.name }}</h5>
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
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
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