<script setup>
import { ref } from "vue"
import Alerta from "./alerta.vue";
const emit = defineEmits(['definir-presupuesto'])
const presupuesto_inicial = ref(0)
const error = ref("")

function ValidarPresupuesto() {
    if (presupuesto_inicial.value > 0) {
        emit('definir-presupuesto', presupuesto_inicial.value)
    } else {
        error.value = "Datos incorrectos"
        setTimeout(() => {
            error.value = ""
        }, 3000);
    }
}

</script>



<template>
    <form @submit.prevent="ValidarPresupuesto()" class="presupuesto">
        <Alerta v-if="error !== ''">
            <p>{{ error }}</p>
        </Alerta>
        <div class="campo">
            <label for="nuevo-presupuesto">
                Definir presupuesto
            </label>
            <input type="number" class="nuevo-presupuesto" id="nuevo-presupuesto" placeholder="Indica tu presupuesto"
                min="0" v-model="presupuesto_inicial">
        </div>
        <input type="submit" value="Aceptar">
    </form>
</template>


<style scoped>
.presupuesto {
    width: 100%;
}

.campo {
    display: grid;
    gap: 2rem;
}

.presupuesto label {
    font-size: 2.2rem;
    text-align: center;
    color: var(--azul);
}

.presupuesto input[type="number"] {
    background-color: var(--gris-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;


}

.presupuesto input[type="submit"] {
    background-color: var(--azul);
    border: none;
    padding: 1rem;
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
    color: var(--blanco);
    font-weight: 900;
    width: 100%;
    transition: background-color 300ms ease;
}

.presupuesto input[type="submit"]:hover {
    background-color: #1048A4;
    cursor: pointer;
}
</style>