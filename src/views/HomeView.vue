<script setup>
    import LeftColumn from '../components/left/LeftColumn.vue'
    import RightColumn from '../components/right/RightColumn.vue'

    import router from '../router'
    import axios from 'axios'
    import { onMounted } from 'vue'

    const assignHeader = (token) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }

    const loginCheck = () => {
        if (localStorage.getItem('api_token') !== null) {
            assignHeader(localStorage.getItem('api_token'))
            return true
        } else {
            router.push('/login')
            return false
        }
    }

    const displayNameCheck = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/v1/my_profile')
        if(res.data.data.displayName === null) {
            router.push('/create_display_name')
        }
    }

    onMounted(() => {
        loginCheck()
        displayNameCheck()
    })
</script>

<template>
    <div class="background">
        <div id="container">
            <LeftColumn />
            <RightColumn />
        </div>
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';
    
    .background {
        width: 100%;
        height: 100dvh;
        background-color: $baseColor;
        padding: 1.5rem;

        #container {
            width: 100%;
            height: 100%;
            display: flex;
            gap: 1.5rem;
        }
    }
</style>