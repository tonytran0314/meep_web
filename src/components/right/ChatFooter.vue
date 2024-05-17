<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import { useRoute } from 'vue-router'

    const messageContent = ref('')
    const route = useRoute()
    const conversationId = route.params.conversationId

    const sendMessage = async (event) => {
        event.preventDefault()
        
        const messageData = {
            conversation_id: conversationId,
            content: messageContent.value,
        }
        
        messageContent.value = ''

        try {
            await axios.post('http://127.0.0.1:8000/api/v1/add_message', messageData)
        } catch (error) {
            throw(error)
        }
    }
</script>

<template>
    <div id="chat_footer">
        <div id="media">
            <div id="sticker"><img src="/src/assets/images/File_fill.png" alt="sticker"></div>
            <div id="images"><img src="/src/assets/images/Img_box_fill.png" alt="sticker"></div>
            <div id="voices"><img src="/src/assets/images/Mic_fill.png" alt="sticker"></div>
        </div>
        <form>
            <div id="chat_input">
                <input v-model="messageContent" type="text" name="content" placeholder="Aa">
            </div>
            <button @click="sendMessage" type="submit" id="send">
                <img src="/src/assets/images/Send_fill.png" alt="send">
            </button>
        </form>
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_footer {
        width: 100%;
        height: 4rem;
        border-radius: 1rem;
        display: flex;
        gap: 1.5rem;
        padding: 0 1.5rem;
        align-items: center;
        background-color: $boxColor;

        #media {
            display: flex;
            gap: 2rem;

            img {
                cursor: pointer;
            }
        }

        form {
            display: flex;
            gap: 1.5rem;
            width: 100%;

            #chat_input {
                width: 100%;
                input {
                    border: none;
                    width: inherit;
                    border-radius: 1rem;
                    padding: 0.3rem 1rem;
                    background-color: $baseColor;
                    color: $white;
                    @include text();

                    &:focus {
                        outline: none;
                    }
                }
            }

            #send {
                border: none;
                cursor: pointer;
                background-color: $boxColor;
            }
        }
    }
    
</style>