<script setup >
const supabase = useSupabaseUser()
const email = ref('');
const password= ref('')
const signInWithOtp = async () => {
  const { error, data } = await supabase.auth.signInWithOtp({
    email: email.value,
    password:password.value,
  
  })
  if(data){
    alert("Logado!")
  }
  if (error) console.log(error)
}
</script>
<template>
  <div class="min-h-screen w-full flex justify-center items-center">
    <div class="border-2 p-8 flex flex-col">
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
    <button class="mt-4" @click="signInWithOtp">
    Confirmar
    </button>
  </div>

  </div>
  
</template>