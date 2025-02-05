import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:8000/api",
	headers: {
		Accept: "application/json",
	},
	withCredentials: true,
	withXSRFToken: true,
});

export async function initCsrfToken() {
	try {
		await API.get("/sanctum/csrf-cookie"); 
		console.log("CSRF cookie initialized");
	} catch (error) {
		console.error("Failed to get CSRF cookie:", error);
	}
}

API.interceptors.request.use(
	async (config) => {
		// Attach Bearer token if available
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Fetch CSRF token from cookies
		let csrfToken = document.cookie
			.split("; ")
			.find((row) => row.startsWith("XSRF-TOKEN="))
			?.split("=")[1];

		// If CSRF token is missing, fetch it first
		if (!csrfToken) {
			console.warn("⚠️ CSRF Token missing, fetching...");
			await initCsrfToken();

			csrfToken = document.cookie
				.split("; ")
				.find((row) => row.startsWith("XSRF-TOKEN="))
				?.split("=")[1];
		}

		console.log(csrfToken);

		// Attach CSRF token to request headers
		config.headers["X-XSRF-TOKEN"] = csrfToken || "";
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default API;
