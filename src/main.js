import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import store from './store/index';
import router from './router/index'

const app = createApp(App);



sessionStorage.setItem("base_server_url", "https://todo-test.digitaltolk.com/api/");
app.provide('baseServerUrl', sessionStorage.getItem("base_server_url"));

app.use(store);
app.use(router);
app.mount('#app');
