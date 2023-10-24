<script setup >
import { createClient } from "@supabase/supabase-js";
const config = useRuntimeConfig();
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
);

const email = ref('');
const password= ref('')

async function singIn() {

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,

})
if(data.user.aud){
location.href = '/painel'

}else{
  console.log(error)
}
}
</script>
<template>
  <div class="min-h-screen w-full flex justify-center items-center">
    <div class="border-2 p-8 flex flex-col">signInWithPassword
    <h1 class="text-[2rem] font-semibold">   Acesso Restrito</h1>
    <label>E-mail</label>
    <input
      v-model="email"
      class="outline-none py-2 rounded-md bg-gray-50"
      type="email"
    />
    <label>Senha</label>
    <input
      class="outline-none py-2 rounded-md bg-gray-50"
      v-model="password"
      type="password"
    />
    <button class="mt-4" @click="singIn">
    Confirmar
    </button>
  </div>

  </div>
  
</template>