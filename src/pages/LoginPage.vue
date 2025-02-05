<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-sm shadow-md w-[70%] md:w-[40%] lg:w-[30%]">
            <h1 class="text-green-500 text-2xl my-4 font-bold text-center">Login</h1>

            <form @submit.prevent="login">
                <Input type="email" label="Email" placeholder="Enter your email" id="email" v-model="email" />
                <div class="text-red-500 text-sm mb-1">
                    <p v-if="errors.email">{{ errors.email }}</p>
                </div>
                <Input type="password" label="Password" placeholder="Enter your password" id="password"
                    v-model="password" />
                <div class="text-red-500 text-sm mb-1">
                    <p v-if="errors.password">{{ errors.password }}</p>
                </div>
                <button type="submit" :disabled="isLoading"
                    class="relative mt-4 w-full inline-flex items-center justify-center px-5 py-2.5 mb-2 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 hover:from-teal-400 hover:to-lime-400 dark:text-white dark:hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50">
                    <span class="flex items-center justify-center w-full">
                        <svg v-if="isLoading" class="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0V4a8 8 0 000 16v-4l3.5 3.5L12 24v-4a8 8 0 01-8-8z">
                            </path>
                        </svg>
                        {{ isLoading ? "Logging In..." : "Login" }}
                    </span>
                </button>
            </form>
            <p class="mt-4 text-center text-sm text-gray-600">
                Don't have an account?
                <RouterLink to="/register" class="text-blue-500 hover:underline">Register</RouterLink>
            </p>
        </div>
    </div>
</template>

<script setup>
import Input from "../components/Input.vue";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import API, { initCsrfToken } from "@/api";
import { useAuthStore } from "@/store/auth";

import { useToast } from "vue-toastification";

const toast = useToast();
const authStore = useAuthStore();
const route = useRouter();

const email = ref("");
const password = ref("");
const errors = ref({});
const isLoading = ref(false);


const login = async () => {
    errors.value = {};
    if (!email.value) {
        errors.value.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        errors.value.email = 'Invalid email format';
    }
    if (!password.value) {
        errors.value.password = "Password is required";
    }

    if (Object.keys(errors.value).length === 0) {
        isLoading.value = true;
        try {

            await initCsrfToken();
            
            const response = await API.post("/login", {
                email: email.value,
                password: password.value,
            }, {
                withCredentials: true,
            });

            // ========== Store the token and user data in the store ==========
            authStore.login(response.data.token);
            authStore.setUser(response.data.user);


            toast.success(response.data.message);
            route.push("/messages");
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                if (validationErrors.email) {
                    errors.value.email = validationErrors.email[0];
                }
                if (validationErrors.password) {
                    errors.value.password = validationErrors.password[0];
                }
                toast.error('Please check your input fields!');
            } else if (error.response && error.response.status === 401) {
                toast.error("Invalid credentials!");
            } else {
                toast.error("Something went wrong!");
            }
        } finally {
            isLoading.value = false;

        }

    }
}

</script>
