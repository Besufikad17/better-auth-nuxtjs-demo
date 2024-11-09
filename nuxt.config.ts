export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-icon',
  ],
  runtimeConfig: {
    apiSecret: {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS
    },
    public: {
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
      CLOUDINARY_URL: process.env.CLOUDINARY_URL,
      NODE_ENV: process.env.NODE_ENV
    }
  },
  ssr: false
});
