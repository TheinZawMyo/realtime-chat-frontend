<template>
    <div class="container mx-auto px-[30px] py-5 flex flex-col md:flex-row justify-between items-center">
        <!-- Logo -->
        <RouterLink to="/" class="text-2xl font-bold text-green-600 mb-3 md:mb-0">
            Real Time Messaging App
        </RouterLink>

        <!-- Navigation Links -->
        <div v-if="authStore.isLoggedIn" class="flex flex-row  md:space-y-0 space-x-4 text-center">
            <RouterLink to="/messages"
                class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 ">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 text-green-500 bg-white rounded-md group-hover:bg-transparent">
                    Messages
                </span>
            </RouterLink>
            <button @click="logout"
                class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 ">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 text-green-500 bg-white rounded-md group-hover:bg-transparent">
                    Logout
                </span>
            </button>
        </div>
        <div v-else class="flex flex-row  md:space-y-0 space-x-4 text-center">
            <RouterLink to="/login"
                class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 ">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 text-green-500 bg-white rounded-md group-hover:bg-transparent">
                    Login
                </span>
            </RouterLink>
            <RouterLink to="/register"
                class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 ">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 text-green-500 bg-white rounded-md group-hover:bg-transparent">
                    Register
                </span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const route = useRouter();

const logout = () => {
    authStore.logout();
    route.push('/login');
}

</script>
