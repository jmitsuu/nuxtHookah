<script setup>
import { useCartStore } from '../stores/storeCart'

import { onMounted, ref } from 'vue'
const store = useCartStore();
let dataItems = 4;
console.log(store.qtdCart)
onMounted(() => {



})
</script>

<template>
  <div v-if="store.modalCart" class="fixed  top-20 w-screen z-50 bg-opacity-90 bg-black h-96 xl:w-full p-2">

    <h1 class="text-[2.0rem] mx-auto text-gray-300 text-center font-bold mb-3">Carrinho</h1>
    <div class="h-64 border overflow-y-scroll">
      <div class="py-2 px-4" v-for="item in store.cart" :key="item.title">
        <div class="flex gap-2 items-center">
          <img :src="`https://kolhpoypmdfbtfpgwuwt.supabase.co/storage/v1/object/public/uploads/`+item.img" class="h-8 rounded-sm" />
          <p class="text-gray-200 font-bold ">
            <span v-for="i in store.qtdCart">
              <span v-if="item.title.includes(i.title)"> {{ i.qt }}x {{ i.title }} -</span>
            </span>
            {{ item.price }} R$
          </p>

          <!-- <XMarkIcon class="h-5 text-red-500 cursor-pointer" @click="store.removeItemCart(item)" /> -->
          <Icon name="ci:close-md"     @click="store.removeItemCart(item)" class="h-5 text-red-500 cursor-pointer" />
        </div>
      </div>
    </div>
    <h1 class="text-white absolute bottom-4 right-4 text-xl font-bold">R$ {{ store.allPrices }}</h1>
    <div class="absolute bottom-2 gap-4 flex justify-center w-full">
      <button class="text-[1.3rem] px-2 bg-yellow-100 rounded-md" @click="store.modalCart = false">
        Continuar
      </button>

      <a class="text-[1.3rem] px-2 bg-yellow-600 rounded-md cursor-pointer"
        :href="`https://api.whatsapp.com/send?phone=554891699518&text=Ola%20tenho%20interesse%20em%20comprar%20os%20produto(s)%20abaixo:%0A%0A%20*${store.sendToWhats}*%20%0A%0ATotal:${store.allPrices}%20`">
        Solicitar
      </a>
      <!-- <button class="text-[1.3rem] px-2 bg-yellow-600 rounded-md">Solicitar</button> -->
    </div>
  </div>
</template>
<style></style>