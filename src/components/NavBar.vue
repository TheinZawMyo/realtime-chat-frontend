<template>
    <div class="container mx-auto px-[30px] py-5 flex justify-between items-center">
        <RouterLink to="/" class="text-2xl font-bold text-green-700">Real Time Messaging App</RouterLink>
        <div class="flex space-x-4">
            <RouterLink to="/login"
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 ">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 text-green-500 bg-white rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Login
                </span>
            </RouterLink>
            <RouterLink to="/register"
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900">
                <span
                    class="relative px-5 py-2.5 transition-all ease-in text-green-500 duration-75 bg-white  rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Register
                </span>
            </RouterLink>
        </div>
    </div>

</template>
