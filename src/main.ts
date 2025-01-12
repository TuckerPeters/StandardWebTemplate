import App from './App.svelte';
import { navigate } from "svelte-routing";

const app = new App({
  target: document.getElementById('app') as HTMLElement,
  props: {
    url: window.location.pathname
  }
});

window.addEventListener('popstate', () => {
  navigate(window.location.pathname);
});

export default app;