<script setup>

    import axios from 'axios'
    import { onMounted, ref, watchEffect } from 'vue'
    import { useRoute } from 'vue-router'
    // import Echo from 'laravel-echo'

    // const seenTime = '00:00am 05/13/2024'
    // if seenTime >= message.time -> insert seenRow
    // thinking about catch Seen Event mechanism
    
    let currentUserID = null
    const messages = ref([])
    const route = useRoute()
    const conversationId = ref(null)

    const emit = defineEmits(['currentChatName'])

    const getMyId = async () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('api_token')
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/v1/my_profile/')
            assignId(res.data.data.id)
        } catch (error) {
            throw(error)
        }
    }

    const getMessages = async () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('api_token')
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/v1/messages/' + conversationId.value)
            emit('currentChatName', res.data.data.name[0])
            fetchMessages(res.data.data.messages)
        } catch (error) {
            throw(error)
        }
    }

    const fetchMessages = (returnData) => {
        messages.value = returnData
    }

    const assignId = (id) => {
        currentUserID = id
    }

    const addNewMessageToArray = (newMessage) => {
        messages.value.push(newMessage)
    }

    watchEffect(() => {
        // Echo.private('message').listen('MessgeEvent', e => {
        //     console.log(e)
        // }) 
        conversationId.value = route.params.conversationId
        getMyId()
        getMessages()
        Echo.channel('message-channel').listen('MessageEvent', e => {
            addNewMessageToArray(e.data)
        })
    })
</script>

<template>
    <div id="chat_body">
        <div 
            v-for="(message, index) in messages" 
            class="chat_row"
            :key="index"
            :class="{my_chat_row: message.senderId === currentUserID}">
                <div class="chat_content"><p>{{ message.content }}</p></div>    
        </div>
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_body {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        padding: 1.5rem;
        overflow-x: hidden;
        overflow-y: scroll;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        /* Hide scrollbar for: */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
        }

        background-color: $boxColor;

        .chat_row {
            width: 100%;
            height: auto;
            display: flex;

            .chat_content {
                width: auto;
                padding: 0.5rem 1rem;
                border-radius: 1rem;
                max-width: 70%;
                overflow-wrap: break-word;
                color: $white;
                background-color: $secondaryButton;
            }
        }

        .my_chat_row {
            justify-content: flex-end;

            .chat_content {
                background-color: $blue;
            }
        }
    }
    
</style>