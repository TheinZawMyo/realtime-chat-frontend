<template>
    <div class="container mx-auto px-[30px] py-5 flex flex-col md:flex-row justify-between items-center">
        <!-- Logo -->
        <RouterLink to="/" class="text-2xl font-bold text-green-700 mb-3 md:mb-0">
            Real Time Messaging App
        </RouterLink>

        <!-- Navigation Links -->
        <div class="flex flex-row md:space-y-0 space-x-4 text-center">
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
