<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-sm shadow-md w-[70%] md:w-[40%] lg:w-[30%]">
            <h1 class="text-green-500 text-2xl my-4 text-center">Registration</h1>

            <form @submit.prevent="login">
                <Input type="text" label="name" placeholder="Enter your name" id="name" v-model="name" required />
                <Input type="email" label="Email" placeholder="Enter your email" id="email" v-model="email" required />
                <Input type="password" label="Password" placeholder="Enter your password" id="password"
                    v-model="password" required />
                <button type="submit"
                    class="w-full bg-green-500 border text-white p-2 rounded-lg hover:bg-white hover:border-green-400 hover:border hover:text-green-600">
                    Register
                </button>
            </form>
            <p class="mt-4 text-center text-sm text-gray-600">
                Already have an account?
                <RouterLink to="/login" class="text-blue-500 hover:underline">Login</RouterLink>
            </p>
        </div>
    </div>
</template>

<script setup>
import Input from "../components/Input.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");

const login = () => {
    console.log(email, password);
}

</script>
