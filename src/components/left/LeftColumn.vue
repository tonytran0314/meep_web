<script setup>
    import ChatListHeader from './ChatListHeader.vue'
    import ChatListBody from './ChatListBody.vue'
    import LeftColumnSkeleton from './LeftColumnSkeleton.vue'

    import { ref } from 'vue'

    const showSkeleton = ref(true)
    const dataLoaded = ref(0)
    const emit = defineEmits(['gotAllDataFromApi'])

    const hideSkeleton = () => {
        // chat-gpt chỉ cái này quá tà đạo :)
        dataLoaded.value += 1
        if(dataLoaded.value === 2) {
            showSkeleton.value = false
            emit('gotAllDataFromApi')
        }
    }
</script>

<template>
    <div id="left" v-show="!showSkeleton">
        <ChatListHeader @gotAvatar="hideSkeleton" />
        <ChatListBody @gotListFromApi="hideSkeleton" />
    </div>
    <LeftColumnSkeleton v-show="showSkeleton" />
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