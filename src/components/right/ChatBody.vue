<script setup>

    // const seenTime = '00:00am 05/13/2024'
    // if seenTime >= message.time -> insert seenRow
    // thinking about catch Seen Event mechanism
    const currentUserID = 1
    const messages = [
        {
            userId: 1,
            content: 'Test message 1',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis deleniti tempore, quam doloribus beatae omnis a quidem laudantium eveniet ullam repudiandae, unde natus maxime. Pariatur a harum suscipit illum expedita!',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 2,
            content: 'Test message 3',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Test message 4',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 2,
            content: 'Test message 5',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Test message 6',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Test message 1',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis deleniti tempore, quam doloribus beatae omnis a quidem laudantium eveniet ullam repudiandae, unde natus maxime. Pariatur a harum suscipit illum expedita!',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 2,
            content: 'Test message 3',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Test message 4',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 2,
            content: 'Test message 5',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Test message 6',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Test message 1',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis deleniti tempore, quam doloribus beatae omnis a quidem laudantium eveniet ullam repudiandae, unde natus maxime. Pariatur a harum suscipit illum expedita!',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 2,
            content: 'Test message 3',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Test message 4',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 2,
            content: 'Test message 5',
            time: '00:00am 05/13/2024'
        },
        {
            userId: 1,
            content: 'Test message 6',
            time: '00:00am 05/13/2024'
        },
    ]

    // onMounted(() => {
    //     Echo.private('message').listen('MessgeEvent', e => {
    //         console.log(e)
    //     })
    // })
</script>

<template>
    <div id="chat_body">
        <div 
            v-for="(message, index) in messages" 
            class="chat_row"
            :key="index"
            :class="{my_chat_row: message.userId === currentUserID}">
                <div class="chat_content">{{ message.content }}</div>    
        </div>
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_body {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        padding: 1.5rem;
        overflow-x: hidden;
        overflow-y: scroll;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

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

            .chat_content {
                width: auto;
                padding: 0.5rem 1rem;
                border-radius: 1rem;
                max-width: 70%;
                color: $white;
                background-color: $secondaryButton;
            }
        }

        .my_chat_row {
            justify-content: flex-end;

            .chat_content {
                background-color: $blue;
            }
        }
    }
    
</style>