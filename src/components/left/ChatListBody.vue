<script setup>
    import ChatListItem from './ChatListItem.vue'
</script>

<template>
    <div id="chat_list_body">
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_list_body {
        display: flex;
        flex-direction: column;
        gap: 2rem;
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