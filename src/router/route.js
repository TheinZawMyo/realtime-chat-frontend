
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import MessagePage from "../pages/MessagePage.vue";
import HomePage from "../pages/HomePage.vue";

const routes = [
	{ path: "/", component: HomePage },
	{ path: "/login", component: LoginPage },
	{ path: "/register", component: RegisterPage },
	{ path: "/messages", component: MessagePage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
