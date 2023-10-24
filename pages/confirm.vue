<script setup>
const user = useSupabaseUser()
watch(user, () => {
  console.log(user)
  if (user.value) {
    return navigateTo('/painel')
  }
}, { immediate: true })
</script>
<template>
  <div>Waiting for login...</div>
</template>