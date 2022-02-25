import App from './App.svelte';
const MAPS_API_KEY = 'AIzaSyAgBe8TaYCDQBr-xxyh0x1otjwUpeGuc4k'
window.initMap = function ready() {
	app.$set({ ready: true });
}
const app = new App({
	target: document.body,
	props: {
		ready: false,
	}
});

export default app;