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
                <button type="submit"
                    class="relative mt-4 w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 ">
                    <span
                        class="relative w-full px-5 py-2.5 transition-all ease-in duration-75 text-green-500 bg-white rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Login
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

const route = useRouter();

const email = ref("");
const password = ref("");
const errors = ref({});


const login = () => {
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
        route.push("/messages");
    }
}

</script>
