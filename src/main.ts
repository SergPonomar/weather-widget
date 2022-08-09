import { defineCustomElement } from 'vue'
import WeatherWidget from './WeatherWidget.ce.vue'
import AddLocation from './components/AddLocation.ce.vue'
import SelectedCities from './components/SelectedCities.ce.vue'
import CityWeather from './components/CityWeather.ce.vue'
import SettingsButton from './components/SettingsButton.ce.vue'
import LoaderIcon from './components/LoaderIcon.ce.vue'

//register custom elements
customElements.define('ce-add-location', defineCustomElement(AddLocation))
customElements.define('ce-selected-cities', defineCustomElement(SelectedCities))
customElements.define('ce-city-weather', defineCustomElement(CityWeather))
customElements.define('ce-settings-button', defineCustomElement(SettingsButton))
customElements.define('ce-loader', defineCustomElement(LoaderIcon))
customElements.define('weather-widget', defineCustomElement(WeatherWidget))