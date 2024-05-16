<script setup>
  import Echo from 'laravel-echo';
 
  import Pusher from 'pusher-js';
  window.Pusher = Pusher;
  
  window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    // auth: {
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('api_token')
    //   }
    // },
    // authEndpoint: 'http://localhost:8000/api/broadcasting/auth'
  });

</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="scss">
  @import '/src/assets/variables';
</style>