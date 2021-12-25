export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-handbook',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles.css'
  ],
  router: {
    middleware: 'authenticated',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue2-google-maps.js' },
    { src: '~/plugins/lodash.js' },
    { src: '~/plugins/firebase.js'},
    { src: '~/plugins/firebase.auth.js'},
    { src: '~/plugins/vue-draggable.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],
  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
    vender: ['vue2-google-maps'],
    transpile: [/^vue2-google-maps($|\/)/],
  },
  generate: {
    dir: 'public'
  }
}
