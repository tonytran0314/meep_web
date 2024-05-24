<script setup>

    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true
        },
        modelValue: {
            type: String
        },
        error: {
            type: String
        }
    })

    const emit = defineEmits(['update:modelValue'])

    const updateModelValue = (event) => {
        const inputValue = event.target.value.trim()
        emit('update:modelValue', inputValue)
    }
</script>

<template>
    <div class="field">
        <div class="field_body">
            <input 
                @input="updateModelValue"
                :value="props.modelValue"
                :type="props.type" 
                :name="props.name" 
                :placeholder="props.placeholder">
        </div>
        <span class="error">{{ props.error }}</span>
    </div>
</template>

<style lang="scss" scoped>

    @import '/src/assets/variables';

    .field {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        .field_body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        }

        .error {
            color: $red;
        }

        label, input {
            @include text();
        }

        input {
            border: none;
            padding: 0.8rem;
            border-radius: 0.5rem;
            width: 15rem;

            background-color: $baseColor;
            color: $white;

            &:focus {
                outline: none;
            }

            &::placeholder {
                @include text();
                color: $darkLabel;
            }
        }
    }
    
    @media only screen and (max-width: 350px) {
        input {
            width: 100% !important;
        }
    }
    
</style>