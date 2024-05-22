<script setup>
    import ChatListBody from './ChatListBody.vue'
    import ChatListBodySkeleton from './ChatListBodySkeleton.vue'
    import ChatListHeader from './ChatListHeader.vue'

    import { ref } from 'vue'

    const showSkeleton = ref(true)

    const hideSkeleton = () => {
        showSkeleton.value = false
    }
</script>

<template>
    <div id="left">
        <ChatListHeader />
        <div>
            <ChatListBody @gotListFromApi="hideSkeleton" />
            <ChatListBodySkeleton v-show="showSkeleton" />
        </div>
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