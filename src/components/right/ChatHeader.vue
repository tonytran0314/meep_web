<script setup>
    
</script>

<template>
    <div id="chat_header">
        <div id="current_chat_avatar_name">
            <div id="current_chat_avatar">
                <img src="/src/assets/images/huy.jpg" alt="avatar">
            </div>
            <h5>Trần Gia Huy</h5>
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
        height: 4rem;
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
                width: 2.5rem;
                height: 2.5rem;

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