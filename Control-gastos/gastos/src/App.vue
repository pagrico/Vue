<script setup>
import { ref, reactive } from "vue";
import presupuesto from './components/presupuesto.vue';
import ControlPresupuesto from './components/ControlPresupuesto.vue';
import iconoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import Modal from "./components/Modal.vue";
import { generarId } from "./helpers/index.js"


const gastos = ref([])
// Estado del modal
const modal = reactive({
  mostrar: false,
  animar: false
});

// Mostrar modal
const mostrarModal = () => {
  modal.mostrar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 200);
};

// Ocultar modal
const ocultarModal = () => {
  modal.animar = false;
  setTimeout(() => {
    modal.mostrar = false;
  }, 500);
};

// Presupuesto total
const presupuestoTot = ref(0);

// Estado de un nuevo gasto
const gasto = reactive({
  nombre: '',
  cantidad: '',
  categoria: '',
  id: null,
  fecha: new Date().toLocaleDateString()
});

// Definir presupuesto
const definirPresupuesto = (num) => {
  presupuestoTot.value = num;
};
const guardarGasto = () => {
  console.log('gasto guardado');

}

</script>

<template>
  <header>
    <h1>Planificador de gastos</h1>
    <div class="contenedor-header contenedor sombra">
      <presupuesto v-if="presupuestoTot === 0" @definir-presupuesto="definirPresupuesto" />
      <ControlPresupuesto v-else :presupuestoTot="presupuestoTot" />
    </div>
  </header>

  <main v-if="presupuestoTot > 0">
    <div @click="mostrarModal" class="crear-gasto">
      <img :src="iconoNuevoGasto" alt="Nuevo gasto" />
    </div>
    <Modal v-if="modal.mostrar" :modal="modal" @ocultar-modal="ocultarModal" v-model:nombre="gasto.nombre"
      v-model:cantidad="gasto.cantidad" v-model:categoria="gasto.categoria" v-on:guardar-gasto="guardarGasto" />
  </main>
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #FFF;
  --gris-claro: #F5F5F5;
  --gris: #94a3b8;
  --gris-oscuro: #64748b;
  --negro: #000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--gris-claro);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

header {
  background-color: var(--azul);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}

.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.contenedor-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.sombra {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
  padding: 5rem;
}

.crear-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.crear-gasto img {
  width: 5rem;
  cursor: pointer;
}
</style>
