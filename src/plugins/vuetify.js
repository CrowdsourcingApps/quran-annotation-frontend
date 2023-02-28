/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/lib/util/colors'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#D9D9D9', 
          secondary: '#0000', 
          info: '#4C7DCA',
          success: '#5FD083',
          fail: '#F79191',
          blue: '#6daed4',
          invalid:'#AA9393',
          invalidoption: '#796767'
        },
      },
    },
  },
})

//primary: '#1867C0',