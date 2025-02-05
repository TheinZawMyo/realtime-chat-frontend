import { defineStore } from "pinia";
import API from "@/api";

export const useMessageStore = defineStore("message", {
    state: () => ({
        messages: [],
    }),
    actions: {
        async fetchMessages(user_id) {
            try {
                const response = await API.get(`/get-messages`, {
                    params: {
                        contact_user_id: user_id,
                    },
                });
                this.messages = response.data.data || [];
                // console.log(response.data.data)
            } catch (err) {
                console.error(err);
            }
        },

        async sendMessage(user_id, message) {
            try {
                const authUser = JSON.parse(localStorage.getItem("user"));
                const response = await API.post(`/send-message`, {
					receiver_id: user_id,
					message: message,
					sender_id: authUser.id,
				});
                this.messages.push(response.data.data);
            } catch (err) {
                console.error(err);
            }
        }
    },
    getters: {
        totalMessages: (state) => state.messages.length,
    },
})