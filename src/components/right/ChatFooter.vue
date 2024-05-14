<script setup>
    
</script>

<template>
    <div id="chat_footer">
        <div id="media">
            <div id="sticker"><img src="/src/assets/images/File_fill.png" alt="sticker"></div>
            <div id="images"><img src="/src/assets/images/Img_box_fill.png" alt="sticker"></div>
            <div id="voices"><img src="/src/assets/images/Mic_fill.png" alt="sticker"></div>
        </div>
        <div id="chat_input">
            <input type="text" placeholder="Aa">
        </div>
        <div id="send">
            <img src="/src/assets/images/Send_fill.png" alt="send">
        </div>
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
        // justify-content: space-between;
        align-items: center;
        background-color: $boxColor;

        #media {
            display: flex;
            gap: 2rem;

            img {
                cursor: pointer;
            }
        }

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
            img {
                cursor: pointer;
            }
        }
    }
    
</style>