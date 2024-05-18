<script setup>
    import ChatHeader from './ChatHeader.vue'
    import ChatBody from './ChatBody.vue'
    import ChatFooter from './ChatFooter.vue'
    import ChatBodySkeleton from './ChatBodySkeleton.vue'

    import { ref, watchEffect } from 'vue'

    const chatName = ref('')

    const handleChatName = (name) => {
        chatName.value = name
    }

    watchEffect(() => {
        handleChatName()
    })
</script>

<template>
    <div id="right">
        <ChatHeader :currentChatName="chatName" />
        <ChatBody @currentChatName="handleChatName" /> 
        <!-- <ChatBodySkeleton /> -->
        <ChatFooter />
    </div>
</template>

<style lang="scss" scoped>
    
    @import '/src/assets/variables';

    #right {
        width: calc(100% - 25rem);
        max-width: calc(100% - 25rem);
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

</style>