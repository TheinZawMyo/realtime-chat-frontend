import Echo from "laravel-echo";
import Pusher from "pusher-js";
import API, { initCsrfToken } from "./api";

window.Pusher = Pusher;

async function initializeEcho() {
	await initCsrfToken(); // ✅ Ensure CSRF token is loaded

	const token = localStorage.getItem("token");

	const csrfToken = document.cookie
		.split("; ")
		.find((row) => row.startsWith("XSRF-TOKEN="))
		?.split("=")[1];

	const echoInstance = new Echo({
		broadcaster: "pusher",
		key: import.meta.env.VITE_APP_REVERB_APP_KEY,
		wsHost: import.meta.env.VITE_APP_REVERB_HOST,
		wsPort: import.meta.env.VITE_APP_REVERB_PORT,
		forceTLS: import.meta.env.VITE_APP_REVERB_SCHEME === "https",
		cluster: "mt1",
		disableStats: true,
		encrypted: true,
		authEndpoint: "http://localhost:8000/broadcasting/auth",
		authorizer: (channel, options) => {
			return {
				authorize: async (socketId, callback) => {
					try {
						const response = await API.post("/broadcasting/auth", {
							socket_id: socketId,
							channel_name: channel.name,
						});

						callback(false, response.data);
					} catch (error) {
						console.error(
							"🔴 Echo Auth Error:",
							error.response?.data || error
						);
						callback(true, error);
					}
				},
			};
		},
	});

	window.Echo = echoInstance;
	return echoInstance;
}

const echoPromise = initializeEcho();
export default echoPromise;
