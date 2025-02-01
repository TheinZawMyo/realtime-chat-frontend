
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import MessagePage from "../pages/MessagePage.vue";

const routes = [
	{ path: "/", redirect: "/login" }, // Redirect root to login
	{ path: "/login", component: LoginPage },
	{ path: "/register", component: RegisterPage },
	{ path: "/messages", component: MessagePage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
