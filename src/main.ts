import { defineCustomElement } from 'vue'
import App from './App.ce.vue'
import AddLocation from './components/AddLocation.ce.vue'
import SelectedCities from './components/SelectedCities.ce.vue'
import CityWeather from './components/CityWeather.ce.vue'
import SettingsButton from './components/SettingsButton.ce.vue'

//register custom elements
customElements.define('ce-add-location', defineCustomElement(AddLocation))
customElements.define('ce-selected-cities', defineCustomElement(SelectedCities))
customElements.define('ce-city-weather', defineCustomElement(CityWeather))
customElements.define('ce-settings-button', defineCustomElement(SettingsButton))
customElements.define('weather-widget', defineCustomElement(App))