<script setup>
    import ChatListBody from './ChatListBody.vue'
    import ChatListHeader from './ChatListHeader.vue'
</script>

<template>
    <div id="left">
        <ChatListHeader />
        <ChatListBody />
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #left {
        min-width: 24rem;
        height: 100%;
        border-radius: 1rem;
        padding: 1.5rem 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
        background-color: $boxColor;
    }
    
</style>