/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import store from "./store";

// Composables
import { createApp } from 'vue'
import i18n from '@/i18n/index.js'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)
app.use(i18n).use(store).mount('#app')
