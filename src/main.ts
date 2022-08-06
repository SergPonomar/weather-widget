//import { createApp } from 'vue'
import { defineCustomElement } from 'vue'
//import './style.css'
import App from './App.ce.vue'
import AddLocation from './components/AddLocation.ce.vue'
import SettingsComponent from './components/SettingsComponent.ce.vue'
import SelectedCities from './components/SelectedCities.ce.vue'


//createApp(App).mount('#app')


console.log(App.styles) // ["/* inlined css */"]
console.log(AddLocation.styles)

// convert into custom element constructor
//const AppElement = defineCustomElement(App)

// register
customElements.define('weather-widget', defineCustomElement(App))
customElements.define('add-location', defineCustomElement(AddLocation))
customElements.define('settings-component', defineCustomElement(SettingsComponent))
customElements.define('selected-cities', defineCustomElement(SelectedCities))
