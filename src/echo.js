import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
	broadcaster: "pusher",
	key: import.meta.env.VITE_APP_REVERB_APP_KEY,
	wsHost: import.meta.env.VITE_APP_REVERB_HOST,
	wsPort: import.meta.env.VITE_APP_REVERB_PORT,
	forceTLS: import.meta.env.VITE_APP_REVERB_SCHEME === "https",
	cluster: "mt1",
	disableStats: true,
	authEndpoint: "http://localhost:8000/broadcasting/auth",
});

export default echo;
// const echo = new Pusher(import.meta.env.VUE_APP_REVERB_APP_KEY, {
// 	cluster: "mt1", // Adjust if needed
// 	wsHost: import.meta.env.VUE_APP_REVERB_HOST,
// 	wsPort: import.meta.env.VUE_APP_REVERB_PORT,
// 	forceTLS: import.meta.env.VUE_APP_REVERB_SCHEME === "https",
// 	disableStats: true,
// });



