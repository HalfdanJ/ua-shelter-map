import App from './App.svelte';
window.initMap = function ready() {
  app.$set({ ready: true });
};
const app = new App({
  target: document.body,
  props: {
    ready: false,
  },
});

export default app;
