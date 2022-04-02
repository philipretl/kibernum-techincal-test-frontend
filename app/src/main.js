import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/index"
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

const app = createApp(App)

app.use(store)
app.component('BootstrapIcon', BootstrapIcon);
app.mount('#app')

