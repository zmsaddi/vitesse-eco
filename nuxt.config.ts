// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },


  // Fix IPC connection closed bug on Windows (Node 22+/24+)
  // On Vercel (Linux): SSR works fine. Locally on Windows: disable SSR to avoid IPC crash.
  ssr: process.env.VERCEL === '1',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/sanity',
    '@nuxt/icon',
    '@nuxt/fonts',
  ],

  // Tailwind CSS
  tailwindcss: {
    cssPath: ['~/assets/css/main.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config.ts',
  },

  // Internationalization
  i18n: {
    locales: [
      { code: 'fr', name: 'Français', language: 'fr-FR', file: 'fr.json' },
      { code: 'es', name: 'Español', language: 'es-ES', file: 'es.json' },
      { code: 'nl', name: 'Nederlands', language: 'nl-NL', file: 'nl.json' },
      { code: 'de', name: 'Deutsch', language: 'de-DE', file: 'de.json' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'fr',
    },
  },

  // Sanity CMS
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID || '',
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: '2026-04-01',
    useCdn: true,
  },

  // Pinia state management
  pinia: {
    storesDirs: ['./stores/**'],
  },

  // Fonts
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Montserrat', provider: 'google', weights: [400, 500, 600, 700, 800, 900] },
    ],
  },

  // Runtime config
  runtimeConfig: {
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    resendApiKey: '',
    databaseUrl: '',
    sanityToken: '',
    authSecret: '',
    public: {
      stripePublishableKey: '',
      siteUrl: 'https://vitesse-eco.com',
    },
  },

  // App config
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Vitesse Eco - Fatbikes Électriques',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Vitesse Eco - Détaillant en Fatbikes Électriques. Découvrez notre gamme de vélos électriques performants et écologiques.' },
        { name: 'theme-color', content: '#0A1628' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ],
    },
  },
})
