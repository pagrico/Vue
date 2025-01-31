<template>
    <header class="py-5 header">
        <div class="container-xl">
            <div class="row justify-content-center justify-content-md-between">
                <div class="col-8 col-md-3">
                    <a href="index.html">
                        <img class="img-fluid" src="/img/logo.svg" alt="imagen logo">
                    </a>
                </div>
                <nav class="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        class="carrito"
                    >
                        <img class="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" class="bg-white p-3">
                            <p v-if = "carrito.length===0"class="text-center m-0">El carrito esta vacio</p>
                            <div v-else>
                            <table class="w-100 table">
                                <thead>
                                    <tr >
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="guitarra in carrito">
                                        <td>
                                            <img class="img-fluid" v-bind:src="`img/${guitarra.imagen}.jpg`" alt="imagen guitarra">
                                        </td>
                                        <td>{{guitarra.nombre}}</td>
                                        <td class="fw-bold">
                                                {{ guitarra.cantidad }}
                                        </td>
                                        <td class="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                class="btn btn-dark"
                                               @click="decremento(guitarra)"
                                            >
                                                -
                                            </button>
                                                {{ guitarra.cantidad }}
                                            <button
                                                type="button"
                                                class="btn btn-dark"
                                               @click="incremento(guitarra)"
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                class="btn btn-danger"
                                                type="button"
                                                @click="borrar(guitarra,carrito)"
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p class="text-end">Total pagar: <span class="fw-bold"  > {{ total}}</span></p>
                            <button class="btn btn-dark w-100 mt-3 p-2" @click="vaciar(carrito)">Vaciar Carrito</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div><!--.row-->
                <div class="row mt-5">
                <div class="col-md-6 text-center text-md-start pt-5">
                    <h1 class="display-2 fw-bold">{{ `Modelo ${guitarra_oferta.nombre}` }}</h1>
                    <p class="mt-5 fs-5 text-white">{{ guitarra_oferta.descripcion }}</p>
                    <p class="text-primary fs-1 fw-black">{{ guitarra_oferta.precio }}</p>
                    <button 
                    v-on:click="$emit('agregar-carrito',guitarra_oferta)"
                        type="button"
                        class="btn fs-4 bg-primary text-white py-2 px-5"
                    >Agregar al Carrito</button>
                </div>
            </div>
        </div>

        <img class="header-guitarra" src="/img/header_guitarra.png" alt="imagen header">
    
    
    </header>
</template>


<script setup>
import { computed } from 'vue';
defineEmits(['agregar-carrito'])
const props = defineProps({
  carrito: {
    type: Array,
    required: true,
  },
  guitarra_oferta:{
    type:Object,
    required:true,
  },
});

// Computar el total de forma reactiva
const total = computed(() => {
  return props.carrito.reduce((acumulado, guitarra) => {
    return acumulado + guitarra.cantidad * guitarra.precio;
  }, 0);
});

function incremento(guitarra) {
    guitarra.cantidad++
}
function decremento(guitarra){
if(!(guitarra.cantidad===1)){
        guitarra.cantidad--
    }
}

function borrar(guitarra,carrito) {
  const index = carrito.findIndex((elemento) => elemento.id === guitarra.id);
  
  if (index !== -1) {
    carrito.splice(index, 1);
  }
}
function vaciar(carrito) {
        carrito.splice(0, carrito.length); // Vacía el array sin perder reactividad
    
}
</script>


<style lang="scss" scoped>

</style>