<script setup>
    import ChatListItem from './ChatListItem.vue'
    import axios from 'axios'
    import { onMounted, ref, watchEffect } from 'vue'
    import router from '../../router'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const conversationId = ref(null)
    const conversations = ref([])
    const emit = defineEmits(['gotListFromApi'])

    const getConversations = async () => {
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('api_token')
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/v1/conversations')
            fetchConversations(res.data.data)
            emit('gotListFromApi')
        } catch (error) {
            throw(error)
        }
    }

    const fetchConversations = (returnData) => {
        conversations.value = returnData
    }

    const openConversation = (type, id) => {
        router.push('/' + type + '/' + id)
    }

    const avatarUrl = (avatar) => {
        const domain = import.meta.env.VITE_API_DOMAIN
        const port = import.meta.env.VITE_API_PORT
        const url = domain + ':' + port
        
        return url + avatar
    }

    onMounted(() => {
        getConversations()
    })

    watchEffect(() => {
        conversationId.value = route.params.conversationId
    })
</script>

<template>
    <div id="chat_list_body">
        <ChatListItem
            v-for="conversation in conversations" 
            :name="conversation.name" 
            :conversationId="conversation.id"
            :avatar="avatarUrl(conversation.avatar)"
            @click="openConversation(conversation.type, conversation.id)" />
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_list_body {
        display: flex;
        flex-direction: column;
        gap: .75rem;
        overflow-x: hidden;
        overflow-y: scroll;

        /* Hide scrollbar for: */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
        }
    }

</style>