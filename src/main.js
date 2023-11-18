import './assets/base.scss'

import { createApp } from 'vue'
import App from './App.vue'
import Experience from "../Experience/Experience";

createApp(App).mount('#app')
const experience = new Experience(document.querySelector(".canvas"))
