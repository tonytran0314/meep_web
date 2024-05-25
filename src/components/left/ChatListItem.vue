<script setup>
    import { ref, watchEffect } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const clickedConversationId = ref(null)
    const itemBgColor = ref('')

    const props = defineProps({
        name: String,
        conversationId: Number,
        avatar: String
    })

    const currentCheck = () => {
        itemBgColor.value = (parseInt(clickedConversationId.value) === props.conversationId) ? '#0A0F19' : ''
    }

    watchEffect(() => {
        clickedConversationId.value = route.params.conversationId
        currentCheck()
    })
</script>

<template>
    <div class="chat_list_item">
        <div class="chat_item">
            <div id="item_avatar">
                <img :src="avatar" alt="avatar">
            </div>
            <div id="preview">
                <div id="name">
                    <p>{{ name }}</p>
                </div>
                <div id="message_preview">
                    <div id="message_content"><p>Tin nhắn thử nghiệm...</p></div>
                    <div id="time"><p>00:00am</p></div>
                </div>
            </div>
        </div>
        <div id="seen_status"></div>
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    .chat_list_item {
        display: flex;
        width: 100%;
        height: auto;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 1rem;
        border-radius: 1rem;
        background-color: v-bind(itemBgColor);

        &:hover {
            background-color: $baseColor;
        }

        .chat_item {
            display: flex;
            width: 100%;
            height: auto;
            gap: 0.75rem;

            #item_avatar {
                width: 3.5rem;
                height: 3.5rem;
                img {
                    width: inherit;
                    height: inherit;
                    border-radius: 50%;
                }
            }

            #preview {
                #name {
                    color: $white;
                }
                #message_preview {
                    display: flex;
                    gap: 0.5rem;

                    #message_content {
                        max-width: 10rem;
                        color: $white;
                    }

                    #time {
                        color: $darkLabel;
                    }
                }
            }
        }

        #seen_status {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background-color: $lightBlue;
        }
    }
    
</style>