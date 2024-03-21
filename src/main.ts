import { createSSRApp } from 'vue';
import App from './App.vue';
import 'virtual:uno.css';
import 'virtual:svg-icons-register';

export function createApp() {
  const app = createSSRApp(App);
  return {
    app
  };
}
