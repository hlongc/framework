import { createApp } from 'vue';
import App from './App.vue';
import HuUi from './package';

const app = createApp(App);
app.config.globalProperties.getName = function() {
  console.log('hello world');
};
app.use(HuUi).mount('#app');
