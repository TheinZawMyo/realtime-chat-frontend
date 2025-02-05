<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <Sidebar @select-user="selectUser" @search-users="searchUsers" @logout="logout"/>

        <!-- Main Chat Area -->
        <div class="flex-1 flex flex-col">
            <!-- Chat Header -->
            <div class="p-4 border-b border-gray-200" v-if="selectedUser !== null">
                <h2 class="text-xl font-semibold">Chat with {{ selectedUser?.name }}</h2>
            </div>

            <!-- Messages -->
            <MessageList :messages="messages" />

            <!-- Message Input -->
            <div class="p-4 border-t border-gray-200" v-if="selectedUser !== null">
                <input type="text" placeholder="Type a message..." class="w-full p-2 border border-gray-300 rounded-lg"
                    v-model="newMessage" @keyup.enter="sendMessage" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/userStore';
import { useMessageStore } from '@/store/messageStore';
import MessageList from '@/components/MessageList.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useRouter } from "vue-router";
import echoPromise from "@/echo";

const authStore = useAuthStore();
const route = useRouter();
const userStore = useUserStore();
const messageStore = useMessageStore();

const selectedUser = ref(null);
const newMessage = ref('');

const messages = computed(() => {
    return selectedUser.value ? messageStore.messages : [];
});


const sendMessage = async () => {
    if (newMessage.value.trim() === '') return;
    await messageStore.sendMessage(selectedUser.value.id, newMessage.value);
    newMessage.value = '';
    
};


const selectUser = (user) => {
    selectedUser.value = user;
    messageStore.fetchMessages(user?.id);
}


// Fetch contact users
onMounted(async () => {
    userStore.getContactUsers();
    const user = JSON.parse(localStorage.getItem("user"));
    const authUserId = user?.id;

    if (authUserId) {
        try {
            const echo = await echoPromise;

            echo.private(`chat.${authUserId}`).listen("MessageEvent", (event) => {
                console.log('Received message:', event);
                if (selectedUser.value) {
                    messageStore.fetchMessages(selectedUser.value.id);
                }
                userStore.getContactUsers();
            });
        } catch (error) {
            console.error("Echo Initialization Failed:", error);
        }
    }
});




const searchUsers = (searchQuery) => {
    userStore.fetchUsers(searchQuery);
};


// ======== logout ==========
const logout = () => {
    authStore.logout();
    route.push('/login');
}
</script>
