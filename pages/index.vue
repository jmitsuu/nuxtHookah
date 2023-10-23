<script setup>
import { useSearchStore } from '@/stores/search';

const store = useSearchStore()
const dataItems = ref([])
const reloadData = ref()

async function getAll() {
    const { data } = await useFetch(`/api/dbListItems/`);

    console.log(data.value.response)
    dataItems.value = data.value.response;
    reloadData.value = data.value.response;


}


const searchCatalag = computed(() => {
    if (dataItems.value && store.search) {
        dataItems.value = dataItems.value.filter((item) => {
            return item.title.toLowerCase().includes(store.search.toLowerCase())
        })
    } else {
        dataItems.value = reloadData.value
    }
    return dataItems.value
})
getAll()
onMounted(() => {
 
    reloadData.value = dataItems.value

})
</script>

<template>
    <LazyMenu />
    <main class="p-6 min-h-screen">
        <div class="absolute top-28">
            <div class="relative mx-auto">
                <input type="search" v-model="store.search" placeholder="Procurar..."
                    class="p-2 bg-slate-100 md:w-full rounded-md" />
                <MagnifyingGlassIcon class="text-black h-8 absolute top-1 right-2" />
                <Icon name="pajamas:search" @click="modal = !modal"
                    class="text-2xl  text-black  absolute top-2 right-2 cursor-pointer font-bold" />

            </div>
        </div>
        <h1 class="text-[2.5rem] font-bold">Catálogo</h1>
        <div class="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3">
            <ul class="" v-for="item of searchCatalag" :key="item.title">

                <LazyProdutos :title="item.title"
                    :img="`https://kolhpoypmdfbtfpgwuwt.supabase.co/storage/v1/object/public/uploads/` + item.img"
                    :price="item.price" :items="item" />
            </ul>
        </div>
    </main>
</template>