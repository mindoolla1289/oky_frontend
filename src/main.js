import { createApp } from 'vue'
import router from './router'
import pinia from './store/index'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css";
import Classic from './components/Classic.vue'




const app = createApp(App)
app.config.devtools = true
app.use(pinia)
app.use(router)
// app.use(CKEditor)
app.component('Classic', Classic)
router.isReady().then(() => {
    app.mount("#app");
});



import "bootstrap/dist/js/bootstrap.js";

