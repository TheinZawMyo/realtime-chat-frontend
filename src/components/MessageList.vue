<template>

    <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div v-if="messages?.length === 0" class="flex justify-center items-center h-[100%]">
            <span class="text-gray-500">No messages yet! Start a conversation.</span>
        </div>
        <div v-for="message in messages" :key="message.id"
            :class="['flex', message.sender_id === authUser.id ? 'justify-end' : 'justify-start']">
            <div
                :class="['p-3 rounded-lg max-w-xs mt-3', message.sender_id === authUser.id ? 'bg-green-500 text-white' : 'bg-gray-200']">
                <span :class="['text-xs', message.sender_id === authUser.id ? 'text-white' : 'text-gray-500']">{{ formatDate(message.created_at) }}</span> <br>
                {{ message.message }}
            </div>
        </div>
    </div>

</template>

<script setup>
import { useAuthStore } from '@/store/auth';

const props = defineProps({
    messages: { type: Array, required: true },
});

const authStore = useAuthStore();

const authUser = authStore.user;


const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

</script>