<script setup>
    const SKELETON_ITEMS = Array(3)
</script>

<template>
    <div id="left_skeleton">
        <div id="header_skeleton">
            <Skeleton shape="circle" size="2rem"></Skeleton>
            <Skeleton width="21rem" height="2.5rem" borderRadius="1.5rem"></Skeleton>
        </div>
        <div id="list_skeleton">
            <div class="item_skeleton"
                v-for="item in SKELETON_ITEMS">
                    <Skeleton shape="circle" size="3.5rem"></Skeleton>
                    <div class="preview_skeleton">
                        <Skeleton width="8rem"></Skeleton>
                        <Skeleton width="16rem"></Skeleton>
                    </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #left_skeleton {
        min-width: 24rem;
        height: 100%;
        border-radius: 1rem;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
        background-color: $boxColor;

        #header_skeleton {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        #list_skeleton {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;

            .item_skeleton {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem 0;

                .preview_skeleton {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
            }
        }
    }

</style>