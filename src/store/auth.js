import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: localStorage.getItem("token") || "",
		user: JSON.parse(localStorage.getItem("user")) || {}, 
	}),
	actions: {
		login(token) {
			this.token = token;
			localStorage.setItem("token", token);
		},
		logout() {
			this.token = "";
			this.user = {}; 
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		},
		setUser(user) {
			this.user = user;
			localStorage.setItem("user", JSON.stringify(user));
		}
	},
	getters: {
		isLoggedIn: (state) => !!state.token, 
		getToken: (state) => state.token,
		getUser: (state) => state.user, 
	},
});
