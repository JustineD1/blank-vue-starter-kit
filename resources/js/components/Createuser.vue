<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
        <div class="w-full max-w-md rounded bg-white p-8 shadow-md">
            <h2 class="mb-6 text-center text-2xl font-bold">Create Account</h2>
            <form @submit.prevent="handleCreateUser">
                <div class="mb-4">
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Name</label
                    >
                    <input
                        id="name"
                        v-model="name"
                        type="text"
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    />
                    <p v-if="nameError" class="mt-1 text-xs text-red-500">
                        {{ nameError }}
                    </p>
                </div>
                <div class="mb-4">
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Email</label
                    >
                    <input
                        id="email"
                        v-model="email"
                        type="email"
                        class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    />
                    <p v-if="emailError" class="mt-1 text-xs text-red-500">
                        {{ emailError }}
                    </p>
                </div>
                <div class="mb-4">
                    <label
                        for="password"
                        class="block text-sm font-medium text-gray-700"
                        >Password</label
                    >
                    <div class="relative">
                        <input
                            id="password"
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'"
                            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            @click="showPassword = !showPassword"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                        >
                            {{ showPassword ? 'Hide' : 'Show' }}
                        </button>
                    </div>
                    <p v-if="passwordError" class="mt-1 text-xs text-red-500">
                        {{ passwordError }}
                    </p>
                </div>
                <button
                    type="submit"
                    :disabled="isLoading"
                    class="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                    {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Login from './login.vue';

export default defineComponent({
    name: 'CreateUser',
    setup() {
        const router = useRouter();
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const showPassword = ref(false);
        const isLoading = ref(false);
        const nameError = ref('');
        const emailError = ref('');
        const passwordError = ref('');

        const validateForm = () => {
            let isValid = true;
            nameError.value = '';
            emailError.value = '';
            passwordError.value = '';

            if (!name.value.trim()) {
                nameError.value = 'Name is required.';
                isValid = false;
            }
            if (!email.value.trim()) {
                emailError.value = 'Email is required.';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(email.value)) {
                emailError.value = 'Email is invalid.';
                isValid = false;
            }
            if (!password.value) {
                passwordError.value = 'Password is required.';
                isValid = false;
            } else if (password.value.length < 6) {
                passwordError.value = 'Password must be at least 6 characters.';
                isValid = false;
            }
            return isValid;
        };

        const handleCreateUser = async () => {
            if (!validateForm()) return;

            isLoading.value = true;
            try {
                await axios.post('/api/users', {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                });
                router.push('/'); // replace alert with this
            } catch (error) {
                alert('An error occurred while creating the account.');
            } finally {
                isLoading.value = false;
            }
        };

        return {
            name,
            email,
            password,
            showPassword,
            isLoading,
            nameError,
            emailError,
            passwordError,
            handleCreateUser,
        };
    },
});
</script>
