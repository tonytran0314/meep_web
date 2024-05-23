<script setup>
    import { onMounted } from 'vue'
    import axios from 'axios'

    const displayNameCheck = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/v1/my_profile')
        if(res.data.data.displayName !== null) {
            router.push('/chat')
        }
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

    onMounted(() => {
        loginCheck()
        displayNameCheck()
    })
</script>

<template>
    <div>
        create display name
    </div>
</template>

<style>
    
</style>