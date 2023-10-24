<script setup>
import { createClient } from "@supabase/supabase-js";
const config = useRuntimeConfig();
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
);
const dataItems = ref();
const modal = ref(false);
const modalCreate = ref(false);
const rId = Math.random() * (5614654125 - 20516) + 4256;
const title = ref();
const price = ref();
const Urlimg = ref();
const inputControl = ref(false);
const controlInputs = ref(false);
const categories = ref();
const controlCategories = ref(false);
const idItem = ref();
const totalId = ref([]);
const inputNewCategoryTitle = ref();
const inputNewCategoryPrice = ref();
const openEdit =ref(false)
const wait = ref(false)
function getCategories(e) {
  if (e) {
    categories.value = e;
    controlCategories.value = true;
    getCatalago();
  }
}
async function getCatalago() {
    wait.value = true
  if (categories.value == "essencias") {
    const { data } = await useFetch(`/api/dbListItems/`);
    const { data1 } = data.value;
    dataItems.value = data1.data;
    wait.value= false
  }
  if (categories.value == "aluminios") {
    dataItems.value = ''
    const { data } = await useFetch(`/api/dbListItems/`);
    const { data2 } = data.value;
    dataItems.value = data2.data;
    wait.value= false
  }
  if (categories.value == "carvoes") {
    dataItems.value = ''
    const { data } = await useFetch(`/api/dbListItems/`);
    const { data3 } = data.value;
    dataItems.value = data3.data;
      wait.value= false
  }
  if (categories.value == "acendedor") {
      dataItems.value = ''
    const { data } = await useFetch(`/api/dbListItems/`);
    const { data4 } = data.value;
    dataItems.value = data4.data;
      wait.value= false
  }
  if (categories.value == "rosh") {
    dataItems.value = ''
    const { data } = await useFetch(`/api/dbListItems/`);
    const { data5 } = data.value;
    dataItems.value = data5.data;
      wait.value= false
  }
  if (categories.value == "pegador") {
    dataItems.value = ''
    const { data } = await useFetch(`/api/dbListItems/`);
    const { data6 } = data.value;
    dataItems.value = data6.data;
    wait.value= false
  }
  title.value = "";
  price.value = "";

}

// async function getAll() {
//   const { data } = await useFetch(`/api/dbListItems/`);
//   console.log(data);
//   if (!controlCategories.value) {
//     dataItems.value = data.value.response;
//     data.value.response.filter((item) => {
//       totalId.value = item.id;
//     });
//   }
// }
// getAll();
async function createItem(e) {
  const files = e.target.files[0];

  console.log(files);
  const { data, error } = await supabase.storage
    .from("uploads")
    .upload("images" + "/" + files.name.replace(/[^a-zA-Z\s]/g, ""), files);
  console.log(data.path, "cadastrado com sucesso!");
  controlInputs.value = true;
  Urlimg.value = data.path;
  if (error) {
    console.log("Erro ao cadastrar", error);
  }
}
async function insertItems() {
  getCatalago();
  const { data, error } = await supabase.from(categories.value).insert({
    id: rId.toFixed(0),
    title: title.value,
    price: price.value,
    img: Urlimg.value,
  });
  modal.value = false;
  console.log(data);
  setTimeout(() => {
    controlInputs.value = false;
    location.reload();
  }, 2000);
}
function selectItem(id, imgName) {
  inputControl.value = true;
  idItem.value = id;
  openEdit.value = true;


  
}
function closeSelect(id) {
  inputControl.value = false;
  idItem.value = id;
  openEdit.value = false;
}
async function updateItems() {
  const { data, error } = await supabase
    .from(categories.value)
    .update({  title: inputNewCategoryTitle.value, price: inputNewCategoryPrice.value })
    .eq('id', idItem.value)
    .select();
    openEdit.value = false
    getCatalago()
    console.log(data)
}
async function deleteItems(id, imgPath){
    const { data, error } = await supabase
  .storage
  .from('uploads')
  .remove([imgPath])
  console.log(imgPath, data, error)

setTimeout(async () => {
    const { error } = await supabase
  .from(categories.value)
  .delete()
  .eq('id', id)
  console.log(error)
  getCatalago() 
}, 400);

}
async function Out(){
  const { error } = await supabase.auth.signOut();
  location.href = '/'

}
// definePageMeta({
//   middleware: 'auth'
// })
onMounted(() => {});
</script>

<template>
  <main class="p-6 min-h-screen">
    <h1 class="text-[2.5rem] font-bold text-center">Painel Administrativo</h1>
    <div class="mt-20">
      <button
        class="px-4 py-3 bg-green-300 shadow mb-3 hover:bg-green-700 transition-all rounded-md font-semibold"
        @click="modal = !modal"
      >
        Novo
      </button>
      <button class="float-right p-2 rounded-md bg-red-300" @click="Out">
        Sair do painel
      </button>
      <Transition>
        <div
          class="w-96 flex flex-col border-2 m-2 bg-slate-50 p-2 rounded-sm relative justify-center items-center"
          v-if="modal"
          @submit.prevent="createItem"
        >
          <div
            class="py-2 mb-5 bg-gray-300 relative w-32 text-center text-[1.1rem] hover:bg-gray-500 cursor-pointer transition-all rounded-md"
            @click="modalCreate = !modalCreate"
          >
            <h1
              class="uppercase"
              v-if="!categories ? (categories = 'Selecione') : categories"
            >
              {{ categories }}
            </h1>
            <ul
              class="absolute bg-gray-500 w-full rounded-sm z-50"
              v-if="modalCreate"
            >
              <li
                class="hover:text-gray-100"
                @click="getCategories('essencias')"
              >
                Essencia
              </li>
              <li class="hover:text-gray-100" @click="getCategories('carvoes')">
                carvoes
              </li>
              <li
                class="hover:text-gray-100"
                @click="getCategories('aluminios')"
              >
                aluminios
              </li>
              <li
                class="hover:text-gray-100"
                @click="getCategories('acendedor')"
              >
                Acendedor
              </li>
              <li class="hover:text-gray-100" @click="getCategories('rosh')">
                Rosh
              </li>
              <li class="hover:text-gray-100" @click="getCategories('pegador')">
                Pegador
              </li>
            </ul>
          </div>

          <label
            class="text-[1.5rem] text-gray-700 uppercase"
            v-if="controlCategories"
            >Titulo</label
          >
          <input
            type="text"
            v-model="title"
            v-if="controlCategories"
            required
            class="border-2 rounded-sm bg-slate-100 outline-none"
          />
          <label
            class="text-[1.5rem] text-gray-700 uppercase"
            v-if="controlCategories"
            >Preço</label
          >
          <input
            type="text"
            v-model="price"
            v-if="controlCategories"
            class="border-2 w-20 rounded-md bg-slate-100 outline-none"
          />
          <label class="text-[1.5rem] text-gray-700 uppercase" v-if="title"
            >Imagem</label
          >
          <input type="file" @change="createItem" v-if="title" />

          <div class="flex gap-2 justify-center">
            <button
              class="bg-green-900 text-white p-2 rounded-md w-24 mt-4"
              @click="insertItems"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </Transition>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Imagem</th>
              <th scope="col" class="px-6 py-3">Titulo</th>
              <th scope="col" class="px-6 py-3">Preço</th>

              <th scope="col" class="px-6 py-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:border-gray-700 relative"
              v-for="items in dataItems"
              :key="items.id"
            >
              <th
                scope="row"
                class="px-2 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white"
              >
                <img
                  class="h-10"
                  :src="
                    `https://kolhpoypmdfbtfpgwuwt.supabase.co/storage/v1/object/public/uploads/` +
                    items.img
                  "
                />
              </th>
              <td class="px-6 py-4 relative">
                <input
                  type="text"
                  v-if="items.id == idItem"
                  v-model="inputNewCategoryTitle"
                  :placeholder="items.title"
                  class=" p-2 border-2 border-blue-500 rounded-sm bg-white text-slate-900"
                  :disabled="!inputControl"
                  required
                />
                <input
                  v-else
                  type="text"
                  :placeholder="items.title"
                  :disabled="!inputControl"
                  class="font-bold  bg-white"
                />
               
              </td>
              <td class="px-6 py-4 relative">
                <input
                  type="text"
                  v-if="items.id == idItem"
                  v-model="inputNewCategoryPrice"
                  :placeholder="items.price"
                  class=" p-2 border-2 border-blue-500 rounded-sm bg-white text-slate-900"
                    :disabled="!inputControl"
                  required
                />
                
                <input
                v-else
                  type="text"
                  v-model="items.price"
                  :placeholder="items.price"
                  :disabled="!inputControl"
                  class="font-bold bg-white"
                />
               <span v-if="items.id == idItem" class="absolute right-0">
                <Icon v-if="openEdit" name="flat-color-icons:checkmark" color="green" class="text-3xl cursor-pointer" @click="updateItems"/>
                <Icon v-if="openEdit" name="ci:close-md"  class="text-3xl text-red-500 cursor-pointer"  @click="closeSelect(items.id)" />
               </span>
              
              </td>

              <td class="px-6 py-4">
                
                <button
                v-if="!openEdit"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                  @click="selectItem(items.id, items.img)"
                >
                  Editar
                </button>
                <button
                v-if="!openEdit"
                  class="font-medium text-red-600 dark:text-red-500 hover:underline"
                @click="deleteItems(items.id, items.img)"
                >
                  Deletar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
       
      </div>
      <div class="border  shadow rounded-md p-4 " v-if="wait">
  <div class="animate-pulse flex space-x-4 justify-between">
      <div class="h-5 w-10  rounded">
     carregando...
      </div>
      <div class="h-5 w-10 rounded">
        carregando...
      </div>
      <div class="h-5 w-10 bg-slate-200 rounded">
     
      </div>
   
     
  
 
    </div>
  </div>

    </div>
  </main>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
