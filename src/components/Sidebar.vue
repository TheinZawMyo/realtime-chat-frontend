<template>
    <div class="w-1/4 bg-white border-r border-gray-200">
        <div class="p-4 border-b border-gray-200 relative">
            <RouterLink to="/" class="text-2xl font-bold">Messaging App</RouterLink>
            <input v-model="searchQuery" type="text" placeholder="Search users for new chat..."
                class="w-full mt-4 p-2 border border-gray-300 rounded-lg" @focus="showDropdown = true"
                @input="searchUsers" @blur="hideDropdown" />

            <!-- User Search Results Dropdown -->
            <div v-if="showDropdown && filteredUsers?.length"
                class="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                <ul>
                    <li v-for="user in filteredUsers" :key="user.id" @mousedown.prevent="selectUser(user)"
                        class="p-3 hover:bg-gray-100 cursor-pointer flex items-center">
                        <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span class="ml-3">{{ user.name }}</span>
                    </li>
                </ul>
            </div>

        </div>
        <div class="overflow-y-auto h-[calc(100vh-120px)] custom-scrollbar">
            <div v-for="user in users" :key="user?.contactUserInfo?.id" class="p-4 hover:bg-gray-100 cursor-pointer">
                <div class="flex items-center" @click="selectUser(user?.contactUserInfo)">
                    <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div class="ml-3">
                        <p class="font-semibold">{{ user?.contactUserInfo?.name }}</p>
                        <p class="text-sm text-gray-500">{{ user?.contactUserInfo?.lastMessage?.message }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed bottom-0 w-1/4">
            <button class="w-full p-3 bg-red-500 text-white font-semibold" @click="emit('logout')">Logout</button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/store/userStore";

const searchQuery = ref("");
const showDropdown = ref(false);

const userStore = useUserStore();
const users = computed(() => userStore.contactUsers);

const emit = defineEmits(["select-user", "search-users", "logout"]);


const filteredUsers = computed(() => {
    return searchQuery.value
        ? userStore.users.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
        : [];
});

const selectUser = (user) => {
    emit("select-user", user);
};

const searchUsers = () => {
    showDropdown.value = true;
    emit("search-users", searchQuery.value);
}

const hideDropdown = () => {
    setTimeout(() => {
        showDropdown.value = false;
    }, 200);
    searchQuery.value = ""
};

</script>