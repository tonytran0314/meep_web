<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import axios from 'axios'
    import router from '../router'
    import { useToast } from "vue-toastification"
    import InputField from '/src/components/InputField.vue'


    const toast = useToast()

    const screenHeight = ref('100vh')
    const padding = ref('0')
    const loginContainer = ref(null)
    const error = ref(null)

    const email = reactive({
        'vmodel': '',
        'type': 'text',
        'name': 'email',
        'label': 'Email',
        'placeholder': 'Enter Email',
        'error': null
    })

    const password = reactive({
        'vmodel': '',
        'type': 'password',
        'name': 'password',
        'label': 'Password',
        'placeholder': 'Enter Password',
        'error': null
    })

    const loginProcess = (event) => {
        event.preventDefault()

        email.error = emailValidation(email.vmodel)
        password.error = passwordValidation(password.vmodel)

        if(email.error === null && password.error === null) {
            const loginInput = {
                email: email.vmodel,
                password: password.vmodel
            }
            sendRequest(loginInput)
        }
    }

    const sendRequest = async (loginInput) => {
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/v1/login', loginInput)

            directToHome()
            saveToken(res.data.data.token)
        } catch (error) {
            if (error.response) {
                catchError(error.response.data.message)
            }
        }
        
    }

    const catchError = (errorMessage) => {
        error.value = errorMessage
    }
    
    const directToHome = () => {
        router.push('/chat')
    }

    // USE REFRESH-TOKEN INSTEAD
    const saveToken = (token) => {
        localStorage.setItem('api_token', token)
    }

    const emailValidation = (email) => {
        //eslint-disable-next-line
        const emailRules = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        let message = null

        // check if empty
        if(isEmpty(email)) { return 'The email cannot be empty' }

        // check if contains invalid characters
        if(invalidChars(email, emailRules)) { return 'The email is invalid' }

        return message
    }

    const passwordValidation = (password) => {

        const passwordRules = /^[a-zA-Z0-9_!@#$%]+$/
        
        let message = null

        // check if empty 
        if(isEmpty(password)) { return 'The password cannot be empty' }
        
        // min length check
        if(!lengthQualify(password)) {  return 'The password min length is 6' }

        // check if contains invalid characters
        if(invalidChars(password, passwordRules)) { return 'The password is invalid' }

        return message
    }

    const isEmpty = (string) => (string === '' || string === null)
    const invalidChars = (string, rules) => !string.match(rules)
    const lengthQualify = (string) => {
        const MIN_LENGTH = 6
        return string.length >= MIN_LENGTH
    }

    const checkScreen = () => {
        if (loginContainer.value.clientHeight > window.innerHeight) {
            screenHeight.value = 'auto'
            padding.value = '3rem'
        } else {
            screenHeight.value = '100vh'
            padding.value = '0'
        }
    }
        
    const notificationCheck = () => {
        if(localStorage.getItem('success_signup') !== null) {
            toast.success('Signup Successfully! You can Log In now')
            localStorage.removeItem('success_signup')
        }
    }

    onMounted(() => {
        checkScreen()
        notificationCheck()
    })


    window.addEventListener('resize', checkScreen)
</script>

<template>
    <div id="auth_base_background">
        <div ref="loginContainer" id="login_container">
            <h1>Log In</h1>
            <div id="login_options">
                <form id="login_form" method="POST">
                    <div id="form_body">
                        <InputField
                            v-model="email.vmodel"
                            :label="email.label"
                            :name="email.name"
                            :placeholder="email.placeholder"
                            :type="email.type"
                            :error="email.error" />
                        <InputField
                            v-model="password.vmodel"
                            :label="password.label"
                            :name="password.name"
                            :placeholder="password.placeholder"
                            :type="password.type"
                            :error="password.error" />
                    </div>
                    <span class="error">{{ error }}</span>
                    <button type="submit" @click="loginProcess">LOG IN</button>
                    <router-link to="/signup" id="switching_form">Create Account</router-link>
                </form>
                <span>or</span>
                <div id="social_media">
                    <div class="social_media_item">
                        <img src="/src/assets/images/facebook.png" alt="Facebook logo">
                        Login with Facebook
                    </div>
                    <div class="social_media_item">
                        <img src="/src/assets/images/google.png" alt="Google logo">
                        Login with Google
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    #auth_base_background {
        @include screenSize(v-bind(screenHeight));
        @include allWaysCenter();
        padding: v-bind(padding);
        background-color: $baseColor;
        display: flex;
        color: $white;

        h1 {
            text-align: center;
        }

        #login_container {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            padding: 4rem;
            border-radius: 1rem;
            background-color: $boxColor;

            #login_options {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 4rem;

                #social_media {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;

                    .social_media_item {
                        display: flex;
                        align-items: center;    
                        gap: 0.8rem;
                        cursor: pointer;
                        padding: 1rem 1.5rem;
                        border-radius: 0.5rem;
                        border: 1px solid $darkLabel;
                        background-color: $baseColor;

                        img {
                            width: 1.6rem;
                        }
                    }
                }
            }

            #login_form {
                display: flex;
                flex-direction: column;
                gap: 2rem;

                #form_body {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .error {
                    color: $red;
                }

                button {
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;

                    @include text(700);
                    background-color: $blue;
                    color: $white;
                }

                #switching_form {
                    color: $lightLabel;
                }
            }
        }
    }

    @media only screen and (max-width: 800px) {
        #login_options {
            flex-direction: column;
            gap: 2rem !important;
        }
    }

    @media only screen and (max-width: 480px) {
        #login_container {
            padding: 2rem !important;
        }
    }

</style>