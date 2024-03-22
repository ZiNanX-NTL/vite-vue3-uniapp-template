import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import 'virtual:uno.css';
import 'virtual:svg-icons-register';

export function createApp() {
  const app = createSSRApp(App);
  // store plugin: pinia
  setupStore(app);

  return {
    app
  };
}
