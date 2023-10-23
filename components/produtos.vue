<script setup>
import { useCartStore } from "@/stores/storeCart";

const store = useCartStore()
let qtd = ref(1)
const qtdPush = ref()
defineProps({
    title: String,
    img: String,
    price: String,
    items: Array,
    qtdInput: Array,

})
onMounted(() => {

})
</script>

<template>
    <li
        class="justify-center items-center flex flex-col p-4 rounded-md border-2 m-2 scale-95 hover:scale-100 transition duration-300 shadow-sm hover:shadow-xl">
        <img :src="img" :alt="title" class="h-64" />

        <p class="font-semibold">{{ title }}</p>
        <p class="text-[1.6rem]">R$ {{ price }}</p>
        <div class="flex gap-4  items-center mt-3 border-t-2">

            <a @click="store.incrementCart(items, qtd)"
                class="text-[1rem] cursor-pointer flex items-center bg-yellow-500 text-gray-800 px-3 py-2 rounded-md mt-3 hover:bg-yellow-800 transition-all">Adicionar

                <Icon name="eva:shopping-cart-fill" class=" text-4xl text-yellow-800 cursor-pointer " />

            </a>

            <div class="flex border items-center rounded-md px-3 py-2 mt-1">
                <label class="mr-1">Qtd:</label>
                <div class="flex flex-col justify-center items-center w-10  ">
                    <Icon name="pajamas:arrow-up"
                        class=" text-xl text-black h-6  w-10 border-[0.1rem] mb-1  cursor-pointer rounded-sm "
                        @click="qtd++" />
                    <input class="w-10   bg-gray-100 font-bold text-center rounded-md " disabled type="number" id="quantity"
                        name="quantity" min="1" v-model="qtd">
                    <Icon name="pajamas:arrow-down"
                        class="mt-1 text-xl text-black h-6  w-10 border-[0.1rem] mb-1  cursor-pointer rounded-sm "
                        @click=" qtd <= 1 ? qtd = 1 : qtd--" />
                </div>

            </div>

        </div>
        <p class="text-xs mt-2 text-red-500">*Sujeito à disponibilidade*</p>
    </li>
</template>
<style scoped>
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;

}

input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;

}</style>