import axios from "axios";

// ✅ Use environment variables
const API = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	},
	withCredentials: true, 
});
await API.get("/sanctum/csrf-cookie");
// ✅ Automatically include Bearer Token
API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default API;
