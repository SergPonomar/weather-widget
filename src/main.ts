import { createApp } from 'vue'
import { defineCustomElement } from 'vue'
import './style.css'
import App from './App.ce.vue'

//createApp(App).mount('#app')


console.log(App.styles) // ["/* inlined css */"]

// convert into custom element constructor
//const AppElement = defineCustomElement(App)

// register
customElements.define('weather-widget', defineCustomElement(App))