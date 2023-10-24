// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css',
  ],
  
  modules: [
 
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/supabase'
    
   

  
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'pt-br' },
           link: [{ rel: 'icon', type: 'image/jpeg', href: "@/logo.jpeg" }]
        }
   },
  runtimeConfig:{
    appwriteApiKey:'',
    databaseKey: '',
    supabaseKey: process.env.SUPABASE_KEY,
    supabaseUrl: process.env.SUPABASE_URL,

 
    public:{
      supabaseKey: process.env.SUPABASE_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
      teste: process.env.NUXT_SUPABASE_URL,
    }
   
},

supabase: {  
  
//  redirect:false
redirectOptions: {   
   login: '/login', 
   callback: '/confirm',   
    exclude: ['/', '/essencias', '/aluminios', '/carvoes', '/rosh', '/pegador', '/acendedor'],  }

 }
})
