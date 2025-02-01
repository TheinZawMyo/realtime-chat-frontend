<template>
    <nav class="bg-white shadow-md sticky">
        <div class="container mx-auto px-[30px] py-5 flex justify-between items-center">
            <RouterLink to="/" class="text-xl font-bold text-green-700">Real Time Chat</RouterLink>
            <div class="flex space-x-4">
                <RouterLink to="/login" class="text-gray-900 hover:text-green-400">Login</RouterLink>
                <RouterLink to="/register" class="text-gray-900 hover:text-green-400">Register</RouterLink>
            </div>
        </div>
    </nav>

</template>
