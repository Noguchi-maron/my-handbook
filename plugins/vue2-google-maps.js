import Vue from 'vue'
import * as VueGoogleMaps from '@/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBh-_M4bK4QLagtvjwzRy9-Eoi5MpP9IXo',
    libraries: 'places',
  },
})
