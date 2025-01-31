<script setup>
import imagen from "../assets/img/grafico.jpg"
import { ref } from "vue"
import { formato } from "../helpers/index.js"

const prop = defineProps({
    presupuestoTot: {
        type: Number,
        required: true
    }
})
const presupuesto = formato(prop.presupuestoTot)
const Disponible = ref(formato(prop.presupuestoTot))
const Gastado = ref(formato(0))



</script>


<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">
            <img :src="imagen" alt="">
        </div>
        <div class="contenedor-presupuesto">
            <button type="button" class="reset-app">Reseteo App</button>
            <p><span>Presupuesto: </span> {{ presupuesto }}</p>
            <p><span>Disponible: </span>{{ Disponible }}</p>
            <p><span>Gastado: </span>{{ Gastado }}</p>
        </div>

    </div>
</template>


<style scoped>
.dos-columnas {
    display: flex;
    flex-direction: column;
}

.dos-columnas> :first-child {
    margin-bottom: 3rem;
}

@media (min-width: 768px) {
    .dos-columnas {
        flex-direction: row;
        gap: 4rem;
        align-items: center;
    }

    .dos-columnas> :first-child {
        margin-bottom: 0;
    }
}

.reset-app {
    background-color: #DB2777;
    border: none;
    padding: 1rem;
    width: 100%;
    color: var(--blanco);
    font-weight: 900;
    text-transform: uppercase;
    border-radius: 1rem;
    transition-property: background-color;
    transition-duration: 300ms;
}

.reset-app:hover {
    cursor: pointer;
    background-color: #c11d67;
}

.contenedor-presupuesto {
    width: 100%;
}

.contenedor-presupuesto p {
    font-size: 2.4rem;
    text-align: center;
    color: var(--gris-oscuro);
}

@media (min-width: 768px) {
    .contenedor-presupuesto p {
        text-align: left;
    }
}

.contenedor-presupuesto span {
    font-weight: 900;
    color: var(--azul);
}
</style>