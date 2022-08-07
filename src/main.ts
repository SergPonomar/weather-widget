import { defineCustomElement } from 'vue'
import App from './App.ce.vue'
import AddLocation from './components/AddLocation.ce.vue'
import SettingsComponent from './components/SettingsComponent.ce.vue'
import SelectedCities from './components/SelectedCities.ce.vue'
import CityWeather from './components/CityWeather.ce.vue'

//register custom elements
customElements.define('weather-widget', defineCustomElement(App))
customElements.define('add-location', defineCustomElement(AddLocation))
customElements.define('settings-component', defineCustomElement(SettingsComponent))
customElements.define('selected-cities', defineCustomElement(SelectedCities))
customElements.define('city-weather', defineCustomElement(CityWeather))
