<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import presupuesto from './components/presupuesto.vue';
import ControlPresupuesto from './components/ControlPresupuesto.vue';
import iconoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import Modal from "./components/Modal.vue";
import { generarId, formato } from "./helpers/index.js"
import Filtro from "./components/Filtro.vue"
import MODGasto from "./components/Gasto.vue"



const gastosFiltrados = computed(() => {
  if (!filtro.value) {
    // Si no hay filtro, devuelve todos los gastos
    return gastos.value;
  }
  // Filtra los gastos según la categoría seleccionada
  return gastos.value.filter((gasto) => gasto.categoria === filtro.value);
});
const gastos = ref([])

const filtro = ref("")
// Estado del modal
const modal = reactive({
  mostrar: false,
  animar: false,
  gasto: {}
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
  datosACero()
};

// Presupuesto total
const presupuestoTot = ref(0);
const disponible = ref(0)
const gastado = ref(0)

// Estado de un nuevo gasto
const gasto = reactive({
  nombre: '',
  cantidad: '',
  categoria: '',
  id: null,
  fecha: new Date().toLocaleDateString()
});

const seleccionarGasto = (id) => {
  const gastoSeleccionado = gastos.value.find(g => g.id === id);
  Object.assign(gasto, gastoSeleccionado);  // Copiar valores al estado reactivo
  mostrarModal();
};
// Definir presupuesto
const definirPresupuesto = (num) => {
  presupuestoTot.value = num;
  disponible.value = num;


};
function datosACero() {
  gasto.nombre = ''
  gasto.cantidad = ''
  gasto.categoria = ''
  gasto.id = null
  gasto.fecha = new Date().toLocaleDateString()
}
const guardarGasto = (cantidad) => {
  if (gasto.id) {
    const index = gastos.value.findIndex(g => g.id === gasto.id);
    if (index !== -1) {

      disponible.value += gastos.value[index].cantidad - cantidad;
      gastado.value -= gastos.value[index].cantidad - cantidad;

      gastos.value[index] = { ...gasto };
    }
  } else {

    gasto.id = generarId();
    gasto.cantidad = cantidad;
    disponible.value -= cantidad;
    gastado.value += cantidad;

    const aux = reactive({ ...gasto });
    gastos.value.push(aux);
  }


  datosACero();
  ocultarModal();
};

const eliminarGasto = (id) => {
  const gastoEliminado = gastos.value.find((gasto) => gasto.id === id);

  if (gastoEliminado) {
    // Actualizar presupuesto disponible y gastado
    disponible.value += gastoEliminado.cantidad;
    gastado.value -= gastoEliminado.cantidad;

    // Eliminar el gasto de la lista
    gastos.value = gastos.value.filter((gasto) => gasto.id !== id);
  }

  ocultarModal(); // Cierra el modal después de eliminar
};


onMounted(() => {
  const presupuestoLocal = localStorage.getItem("presupuesto");
  const gastosLocal = localStorage.getItem("gastos");

  if (presupuestoLocal) {
    presupuestoTot.value = parseInt(presupuestoLocal);
    disponible.value = parseInt(presupuestoLocal);
  }

  if (gastosLocal) {
    gastos.value = JSON.parse(gastosLocal);
    gastos.value.forEach((g) => {
      gastado.value += g.cantidad; // Recalcular el monto gastado
    });
    disponible.value -= gastado.value; // Ajustar el monto disponible
  }
});

// Guardar presupuesto y gastos en localStorage
watch(presupuestoTot, (nuevoPresupuesto) => {
  localStorage.setItem("presupuesto", nuevoPresupuesto.toString());
});

watch(gastos, (nuevosGastos) => {
  localStorage.setItem("gastos", JSON.stringify(nuevosGastos));
}, { deep: true });

const restart = () => {
  presupuestoTot.value = 0
  disponible.value = 0
  gastado.value = 0
  gastos.value = []
}
</script>

<template>
  <header>
    <h1>Planificador de gastos</h1>
    <div class="contenedor-header contenedor sombra">
      <presupuesto v-if="presupuestoTot === 0" @definir-presupuesto="definirPresupuesto" />
      <ControlPresupuesto v-else :presupuestoTot="presupuestoTot" v-model:disponible="disponible"
        v-model:gastado="gastado" @reset-app="restart" />
    </div>
  </header>

  <main v-if="presupuestoTot > 0">
    <Filtro v-model:filtro="filtro" />
    <div @click="mostrarModal" class="crear-gasto">
      <img :src="iconoNuevoGasto" alt="Nuevo gasto" />
    </div>
    <Modal v-if="modal.mostrar" :modal="modal" @ocultar-modal="ocultarModal" v-model:nombre="gasto.nombre"
      v-model:cantidad="gasto.cantidad" v-model:categoria="gasto.categoria" v-on:guardar-gasto="guardarGasto"
      v-model:disponible="disponible" :id="gasto.id" :total="presupuestoTot" @eliminar-gasto="eliminarGasto" />


    <div class=" listado-gastos contenedor">
      <h2>{{ gastos.length == 0 ? 'No hay gastos' : 'Gastos:' }}</h2>
      <MODGasto v-for="gasto in gastosFiltrados" :key="gasto.id" :gasto="gasto" @seleccionar-gasto="seleccionarGasto" />

    </div>
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

.listado-gastos {
  margin-top: 10rem;
}

.listado-gastos h2 {
  font-weight: 900;
  color: var(--gris-oscuro);
}
</style>
