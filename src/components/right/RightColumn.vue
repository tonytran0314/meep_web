<script setup>
    import ChatHeader from './ChatHeader.vue'
    import ChatBody from './ChatBody.vue'
    import ChatFooter from './ChatFooter.vue'
</script>

<template>
    <div id="right">
        <ChatHeader />
        <ChatBody /> 
        <ChatFooter />
    </div>
</template>

<style lang="scss" scoped>
    
    @import '/src/assets/variables';

    #right {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

</style>