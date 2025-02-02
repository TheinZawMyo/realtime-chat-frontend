
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import MessagePage from "../pages/MessagePage.vue";
import HomePage from "../pages/HomePage.vue";
import { useAuthStore } from "@/store/auth";

const routes = [
	{ path: "/", component: HomePage },
	{ path: "/login", component: LoginPage },
	{ path: "/register", component: RegisterPage },
	{ path: "/messages", component: MessagePage, meta: { requiresAuth: true } },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	const isLoggedIn = authStore.isLoggedIn;
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	if (requiresAuth && !isLoggedIn) {
		next("/login");
	} else {
		next();
	}
});

export default router;
