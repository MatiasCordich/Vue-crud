import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineRule, configure } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { Field, Form, ErrorMessage } from 'vee-validate'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'

defineRule('required', required)

configure({
    generateMessage: ({field}) => `El campo ${field} es obligatorio`
})

const app = createApp(App)
const pinia = createPinia()

app.component('Field', Field);
app.component('Form', Form);
app.component('ErrorMessage', ErrorMessage);
app.use(pinia)
app.use(ElementPlus)
app.use(router).mount('#app')


