import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:8000/api",
	headers: {
		Accept: "application/json",
	},
	withCredentials: true,
	withXSRFToken: true,
});

let csrfInitialized = false;

export async function initCsrfToken() {
	try {
		if (!csrfInitialized) {
			csrfInitialized = true;
			await API.get("/sanctum/csrf-cookie");
			console.log("CSRF cookie initialized");
		}
	} catch (error) {
		console.error("Failed to get CSRF cookie:", error);
	}
}


initCsrfToken();

API.interceptors.request.use(
	(config) => {
		// Attach Bearer token if available
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Fetch CSRF token from cookies
		const csrfToken = document.cookie
			.split("; ")
			.find((row) => row.startsWith("XSRF-TOKEN="))
			?.split("=")[1];

		// Attach CSRF token only if it's available
		if (csrfToken) {
			config.headers["X-XSRF-TOKEN"] = csrfToken;
		} else {
			console.warn("CSRF Token missing");
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default API;
