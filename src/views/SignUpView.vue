<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import axios from 'axios'
    import router from '../router'
    import InputField from '/src/components/InputField.vue'

    const screenHeight = ref('100vh')
    const padding = ref('0')
    const signupContainer = ref(null)
    const error = ref(null)

    const fullname = reactive({
        'vmodel': '',
        'type': 'text',
        'name': 'fullname',
        'label': 'Full Name:',
        'placeholder': 'Enter Full Name',
        'error': null
    })

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

    const confirmPassword = reactive({
        'vmodel': '',
        'type': 'password',
        'name': 'password_confirmation',
        'label': 'Confirm Password',
        'placeholder': 'Enter Password again',
        'error': null
    })

    const signupProcess = (event) => {
        event.preventDefault()

        fullname.error = fullnameValidation(fullname.vmodel)
        email.error = emailValidation(email.vmodel)
        password.error = passwordValidation(password.vmodel, confirmPassword.vmodel)

        if( fullname.error === null && 
            email.error === null && 
            password.error === null) {
                const signupInput = {
                    name: fullname.vmodel,
                    email: email.vmodel,
                    password: password.vmodel,
                    password_confirmation: confirmPassword.vmodel
                }
                sendRequest(signupInput)
        }
    }

    const sendRequest = async (signupInput) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/v1/signup', signupInput)
            router.push('/login')
            localStorage.setItem('success_signup', '1')
        } catch (error) {
            if (error.response) {
                catchError(error.response.data.message)
            }
        }
                        
    }

    const catchError = (errorMessage) => {
        error.value = errorMessage
    }

    const fullnameValidation = (fullname) => {
        
        const fullnameRules = /^[a-zA-Z0-9_!@#$%]+$/
        
        let message = null

        // check if empty 
        if(isEmpty(fullname)) { return 'The full name cannot be empty' }

        // check if contains invalid characters
        if(invalidChars(fullname, fullnameRules)) { return 'The full name is invalid' }

        return message
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

    const passwordValidation = (password, password_confirm) => {

        const passwordRules = /^[a-zA-Z0-9_!@#$%]+$/
        
        let message = null

        // check if empty 
        if(isEmpty(password)) { return 'The password cannot be empty' }
        
        // min length check
        if(!lengthQualify(password)) { return 'The password min length is 6' }

        // check if contains invalid characters
        if(invalidChars(password, passwordRules)) { return 'The password is invalid' }

        // check if password and confirm password match 
        if(!passwordMatch(password, password_confirm)) { return 'The passwords are not matched' }

        return message
    }

    const isEmpty = (string) => (string === '' || string === null)
    const invalidChars = (string, rules) => !string.match(rules)
    const passwordMatch = (password, password_confirm) => password === password_confirm
    const lengthQualify = (string) => {
        const MIN_LENGTH = 6
        return string.length >= MIN_LENGTH
    }

    const checkScreen = () => {
        if (signupContainer.value.clientHeight > window.innerHeight) {
            screenHeight.value = 'auto'
            padding.value = '3rem'
        } else {
            screenHeight.value = '100vh'
            padding.value = '0'
        }
    }

    onMounted(() => {
        checkScreen()
    })

    window.addEventListener('resize', checkScreen)
</script>

<template>
    <div id="auth_base_background">
        <div ref="signupContainer" id="signup_container">
            <h1>Sign Up</h1>
            <div id="signup_options">
                <form id="signup_form">
                    <div id="form_body">
                        <div class="row">
                            <InputField
                                v-model="fullname.vmodel"
                                :label="fullname.label"
                                :name="fullname.name"
                                :placeholder="fullname.placeholder"
                                :type="fullname.type"
                                :error="fullname.error" />
                            <InputField
                                v-model="email.vmodel"
                                :label="email.label"
                                :name="email.name"
                                :placeholder="email.placeholder"
                                :type="email.type"
                                :error="email.error" />
                        </div>
                        <div class="row">
                            <InputField
                                v-model="password.vmodel"
                                :label="password.label"
                                :name="password.name"
                                :placeholder="password.placeholder"
                                :type="password.type"
                                :error="password.error" />
                            <InputField
                                v-model="confirmPassword.vmodel"
                                :label="confirmPassword.label"
                                :name="confirmPassword.name"
                                :placeholder="confirmPassword.placeholder"
                                :type="confirmPassword.type"
                                :error="confirmPassword.error" />
                        </div>
                    </div>
                    <span class="error">{{ error }}</span>
                    <button type="submit" @click="signupProcess">SIGN UP</button>
                    <router-link to="/login" id="switching_form">Already have account? Login</router-link>
                </form>
                <span>or</span>
                <div id="social_media">
                    <div class="social_media_item">
                        <img src="/src/assets/images/facebook.png" alt="Facebook logo">
                        Sign Up with Facebook
                    </div>
                    <div class="social_media_item">
                        <img src="/src/assets/images/google.png" alt="Google logo">
                        Sign Up with Google
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


        #signup_container {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            padding: 4rem;
            border-radius: 1rem;
            background-color: $boxColor;

            #signup_options {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 2rem;

                #social_media {
                    display: flex;
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

            h1 {
                text-align: center;
            }

            #signup_form {
                display: flex;
                flex-direction: column;
                gap: 2rem;

                #form_body {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .row {
                    display: flex;
                    gap: 2rem;
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

    @media only screen and (max-width: 768px) {
        #social_media, .row {
            flex-direction: column;
        }
    }
</style>