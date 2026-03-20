<template>
    <div class="flex h-screen items-center justify-center bg-gray-100">
        <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
            <h2 class="mb-2 text-center text-3xl font-bold text-gray-800">Welcome back</h2>
            <p class="mb-6 text-center text-sm text-gray-500">Sign in to your account</p>

            <div v-if="errorMessage" class="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin" novalidate>
                <div class="mb-4">
                    <label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        v-model.trim="email"
                        placeholder="you@example.com"
                        :class="[
                            'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition',
                            emailError
                                ? 'border-red-400 focus:ring-red-200'
                                : 'border-gray-300 focus:ring-blue-200'
                        ]"
                    />
                    <p v-if="emailError" class="mt-1 text-xs text-red-500">{{ emailError }}</p>
                </div>

                <div class="mb-6">
                    <label for="password" class="mb-1 block text-sm font-medium text-gray-700">Password</label>
                    <div class="relative">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            id="password"
                            v-model="password"
                            placeholder="••••••••"
                            :class="[
                                'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition pr-10',
                                passwordError
                                    ? 'border-red-400 focus:ring-red-200'
                                    : 'border-gray-300 focus:ring-blue-200'
                            ]"
                        />
                        <button
                            type="button"
                            @click="showPassword = !showPassword"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                        >
                            {{ showPassword ? 'Hide' : 'Show' }}
                        </button>
                    </div>
                    <p v-if="passwordError" class="mt-1 text-xs text-red-500">{{ passwordError }}</p>
                </div>
                <p class="mb-4 text-right text-sm">
                    <a href="#" class="text-blue-500 hover:underline">Forgot password?</a>
                </p>
                <button
                    type="submit"
                    :disabled="isLoading"
                    class="w-full rounded-lg bg-blue-500 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <svg v-if="isLoading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    {{ isLoading ? 'Signing in...' : 'Login' }}
                </button>
                <p class="pt-4 mb-4 text-center text-sm">
                    Don't have an account?
                  <router-link to="/create" class="text-blue-500 hover:underline">Sign up</router-link>

                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const emailError = ref('');
const passwordError = ref('');

const validateForm = () => {
    let valid = true;
    emailError.value = '';
    passwordError.value = '';

    if (!email.value) {
        emailError.value = 'Email is required.';
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.value = 'Please enter a valid email address.';
        valid = false;
    }

    if (!password.value) {
        passwordError.value = 'Password is required.';
        valid = false;
    } else if (password.value.length < 8) {
        passwordError.value = 'Password must be at least 8 characters.';
        valid = false;
    }

    return valid;
};

const handleLogin = async () => {
    errorMessage.value = '';
    if (!validateForm()) return;

    isLoading.value = true;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMessage.value = data.message || 'Invalid email or password.';
            return;
        }

        if (data.token) {
            localStorage.setItem('auth_token', data.token);
        }

        router.push('/dashboard');
    } catch (err) {
        errorMessage.value = 'Something went wrong. Please try again.';
    } finally {
        isLoading.value = false;
    }
};
</script>