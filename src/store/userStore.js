import { defineStore } from 'pinia';
import API, { initCsrfToken } from '@/api';

export const useUserStore = defineStore("user",{
	state: () => ({
        users: [],
		user: null,
		contactUsers: [],
		loading: false,
		error: null,
	}),
	actions: {
		async fetchUsers(search = "") {
			this.loading = true;
			this.error = null;
			try {
				await initCsrfToken();
				const response = await API.get(`/search-users?name=${search}`);
				this.users = response.data.users || [];
			} catch (err) {
				this.error = err.response?.data?.message || err.message;
			} finally {
				this.loading = false;
			}
        },
        async getUser(id) {
            this.loading = true
            this.error = null;
			try {
				await initCsrfToken();
                const response = await API.get(`/user-detail?user_id=${id}`);
                this.user = response.data.user || {};
            } catch (err) {
                this.error = err.response?.data?.message || err.message;
            } finally {
                this.loading = false;
            }
        },

		async getContactUsers() {
			this.loading = true;
			this.error = null;
			this.contactUsers = [];
			try {
				await initCsrfToken();
				const response = await API.get("/get-contact-users");
				if (response && response.data) {
					this.contactUsers = response.data;
				} else {
					throw new Error("Unexpected response format");
				}
			} catch (err) {
				this.error = err.response?.data?.message || err.message || "An error occurred";
			} finally {
				this.loading = false;
			}
		},

	},
	getters: {
		totalUsers: (state) => state.users.length,
	},
});