const config = require('config')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'soundcloud-api',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ]
  },
  env: config.get('env'),

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global css files
  */
  css: ['~/assets/css/main.css'],
  plugins: [{ src: '~/plugins/localStorage.js', ssr: false }],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** include client-side libraries
    */
    vendor: ['soundcloud'],

    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: [
      require('rucksack-css')()
      // require('postcss-cssnext')(),
      // require('lost')()
    ]
  }
}
