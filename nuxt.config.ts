export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    'nuxt-mail'
  ],
  runtimeConfig: {
    mail: {
      smtp: {
        host: process.env.NUXT_MAIL_SMPT,
        port: parseInt(process.env.NUXT_MAIL_PORT as string)
      },
    },
  },
  // runtimeConfig: {
  //   mail: {
  //     smtp: {
  //       host: process.env.NUXT_MAIL_SMPT,
  //       port: parseInt(process.env.NUXT_MAIL_PORT as string),
  //       secure: true,
  //       auth: {
  //         user: process.env.NUXT_MAIL_USERNAME,
  //         pass: process.env.NUXT_MAIL_PASSWORD
  //       }
  //     }
  //   }
  // }
});