<template>
    <div class="flex flex-col md:flex-row items-center justify-center h-screen px-4">
        <!-- Left: Image -->
        <div class="flex flex-col items-center justify-center w-full md:w-1/2">
            <img src="@/assets/images/homeimage.svg" alt="logo" class="w-3/4 md:w-1/2 mx-auto h-[400px]" />
        </div>

        <!-- Right: Text -->
        <div class="flex flex-col items-center justify-center text-center w-full md:w-1/2">
            <span class="text-2xl md:text-2xl font-semibold">
                <span class="text-green-500">Real Time Messaging App</span> <br />
                using <br />
                <span class="text-green-500">Laravel API and Vue 3 Composition API</span>
            </span>
        </div>
    </div>
</template>
