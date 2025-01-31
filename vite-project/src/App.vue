

<script setup>
import {ref,reactive,onMounted, watch} from 'vue'
import {db} from './data/guitarra'
import Guitarra from "./components/Guitarra.vue"
import Header from "./components/Header.vue"

const guitarra_oferta=ref({})
const guitarras=ref([])
const carrito=ref([]);

onMounted(() => {
  guitarras.value = db;
  guitarra_oferta.value=db[3];
  carrito.value=JSON.parse(localStorage.getItem("carrito"))||[];
})



watch(carrito,()=>{
  guardarLocalStorage()
},{
  deep:true
})


function guardarLocalStorage(){
localStorage.setItem("carrito",JSON.stringify(carrito.value))
}
const agregarCarrito = (guitarra) => {
  // Buscar índice de la guitarra en el carrito
  const guitarraEncontrada = carrito.value.findIndex(
    (guitarraCarrito) => guitarra.id === guitarraCarrito.id
  );

  if (guitarraEncontrada >= 0) {
    // Si existe, incrementar cantidad
    carrito.value[guitarraEncontrada].cantidad++;
  } else {
    // Si no existe, agregarla al carrito con cantidad inicial 1
    guitarra.cantidad = 1;
    carrito.value.push(guitarra);
  }
 

};


</script>

<template>
  
      <Header
        v-bind:carrito="carrito"
        :guitarra_oferta="guitarra_oferta"
        @agregar-carrito="agregarCarrito"
      />

    

    <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>

        <div class="row mt-5">
          <Guitarra
          v-for="guitarra in guitarras"
          :guitarra="guitarra"
          @agregar-carrito="agregarCarrito"
          
          />
            
        </div>
    </main>


    <footer class="bg-dark mt-5 py-5">
        <div class="container-xl">
            <p class="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

</template>

<style scoped>

</style>
