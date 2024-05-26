<script setup>
    const SKELETON_ITEMS = [
        {
            myChat: true,
            width: '16rem',
            height: '4rem'
        },
        {
            myChat: false,
            width: '10rem',
            height: '2rem'
        },
        {
            myChat: true,
            width: '24rem',
            height: '2rem'
        },
        {
            myChat: false,
            width: '32rem',
            height: '4rem'
        },
        {
            myChat: true,
            width: '20rem',
            height: '4rem'
        },
    ]
</script>

<template>
    <div id="chat_body_skeleton">
        <div
            v-for="item in SKELETON_ITEMS"
            :class="{my_chat_row: item.myChat}"
            class="chat_row">
                <Skeleton v-show="!item.myChat" shape="circle" size="2rem"></Skeleton>
                <Skeleton 
                    :width="item.width" 
                    :height="item.height" 
                    borderRadius="1rem">
                </Skeleton>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_body_skeleton {
        width: 100%;
        height: 100%;
        // border-radius: 1rem;
        padding: 1.5rem;
        overflow-x: hidden;
        overflow-y: scroll;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

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
            gap: 0.5rem;
            align-items: flex-end;
        }

        .my_chat_row {
            justify-content: flex-end;
        }
    }
    
</style>