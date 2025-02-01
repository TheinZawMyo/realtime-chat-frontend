<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="w-1/4 bg-white border-r border-gray-200">
            <div class="p-4 border-b border-gray-200">
                <RouterLink to="/" class="text-2xl font-bold">Messaging App</RouterLink>
                <input type="text" placeholder="Search users for new chat..."
                    class="w-full mt-4 p-2 border border-gray-300 rounded-lg" />
            </div>
            <div class="overflow-y-auto h-[calc(100vh-120px)] custom-scrollbar">
                <div v-for="user in users" :key="user.id" class="p-4 hover:bg-gray-100 cursor-pointer">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div class="ml-3">
                            <p class="font-semibold">{{ user.name }}</p>
                            <p class="text-sm text-gray-500">{{ user.lastMessage }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fixed bottom-0 w-1/4">
                <button class="w-full p-3 bg-red-500 text-white font-semibold">Logout</button>
            </div>
        </div>

        <!-- Main Chat Area -->
        <div class="flex-1 flex flex-col">
            <!-- Chat Header -->
            <div class="p-4 border-b border-gray-200">
                <h2 class="text-xl font-semibold">Chat with {{ selectedUser }}</h2>
            </div>

            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div v-for="message in messages" :key="message.id"
                    :class="['flex', message.sender === 'me' ? 'justify-end' : 'justify-start']">
                    <div
                        :class="['p-3 rounded-lg max-w-xs mt-3', message.sender === 'me' ? 'bg-green-500 text-white' : 'bg-gray-200']">
                        {{ message.text }}
                    </div>
                </div>
            </div>

            <!-- Message Input -->
            <div class="p-4 border-t border-gray-200">
                <input type="text" placeholder="Type a message..." class="w-full p-2 border border-gray-300 rounded-lg"
                    v-model="newMessage" @keyup.enter="sendMessage" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const users = ref([
    { id: 1, name: 'John Doe', lastMessage: 'Hello!' },
    { id: 2, name: 'Jane Smith', lastMessage: 'How are you?' },
    { id: 3, name: 'Alice Johnson', lastMessage: 'See you later!' },
]);

const selectedUser = ref('John Doe');

const messages = ref([
    { id: 1, sender: 'me', text: 'Hi there!' },
    { id: 2, sender: 'John Doe', text: 'Hello!' },
    { id: 3, sender: 'me', text: 'How are you?' },
]);

const newMessage = ref('');

const sendMessage = () => {
    if (newMessage.value.trim() === '') return;
    messages.value.push({
        id: messages.value.length + 1,
        sender: 'me',
        text: newMessage.value,
    });
    newMessage.value = '';
};
</script>
