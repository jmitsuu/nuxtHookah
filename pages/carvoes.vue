<script setup>
// import { dataEssencia } from '../composables'
const dataCarvoes = ref([])
async function getApi(){
const {data} = await useFetch('/api/dbListItems/')
const {data2} = data.value

dataCarvoes.value = data2.data

}
getApi()
onMounted(()=>{
 
})
</script>

<template>
    <LazyMenu/>
  <main class="p-6 min-h-screen">
    <h1 class="text-[2.5rem] font-bold">Essências</h1>
    <div class="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3">
      <ul class=""
      v-for="item of dataCarvoes"
          :key="item.title"
      >
      <LazyProdutos 
       :title="item.title"
       :img="`https://kolhpoypmdfbtfpgwuwt.supabase.co/storage/v1/object/public/uploads/`+item.img"
       :price="item.price"
       :items="item"
      
       />
      </ul>
    </div>
  </main>
</template>