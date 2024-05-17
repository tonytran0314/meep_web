<script setup>
    const SKELETON_ITEMS = Array(5)
</script>

<template>

    <div id="chat_list_body_skeleton">
        <div
            v-for="item in SKELETON_ITEMS"
            class="chat_item_skeleton">
                <Skeleton shape="circle" size="3.5rem"></Skeleton>
                <div class="preview_skeleton">
                    <Skeleton width="8rem"></Skeleton>
                    <Skeleton width="16rem"></Skeleton>
                </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #chat_list_body_skeleton {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        .chat_item_skeleton {
            display: flex;
            gap: 0.75rem;
            align-items: center;
            padding: 1rem;
            border-radius: 1rem;
            background-color: $secondaryButton;

            .preview_skeleton {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
        }
    }

</style>