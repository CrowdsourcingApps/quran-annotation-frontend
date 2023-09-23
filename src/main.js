/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import store from "./store";
import setupInterceptors from './services/setupInterceptors';

// Composables
import { createApp } from 'vue'
import i18n from '@/i18n/index.js'
import amplitude from '@/amplitude/index.js'
import { createHead } from '@unhead/vue'

// Plugins
import { registerPlugins } from '@/plugins'


setupInterceptors(store);

const app = createApp(App)
const head = createHead()

registerPlugins(app)
app.use(head).use(i18n).use(store).use(amplitude).mount('#app')
