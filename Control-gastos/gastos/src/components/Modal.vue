<script setup>
import cerrarModal from "../assets/img/cerrar.svg"
import { ref } from "vue"
import Alerta from "./alerta.vue"


const emit = defineEmits(['ocultar-modal', 'update:nombre', 'update:cantidad', 'update:categoria', 'guardar-gasto'])
const error = ref("");
const props = defineProps({
    modal: {
        type: Object,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: [String, Number],
        required: true

    },
    categoria: {
        type: String,
        required: true
    },
    disponible: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    id: { // Agregar el id a las props
        type: [String, Number, null],
        required: true
    }

});
const agregarGasto = () => {
    const { nombre, cantidad, categoria, disponible, id, total } = props;

    if ([categoria, cantidad, nombre].includes("")) {
        error.value = "Todos los campos son obligatorios";
        setTimeout(() => {
            error.value = "";
        }, 3000);
        return;
    }

    if (cantidad <= 0) {
        error.value = "Cantidad no válida";
        setTimeout(() => {
            error.value = "";
        }, 3000);
        return;
    }

    // Verifica si estamos editando un gasto (id no es null)
    if (id !== null) {
        const cantidadAntigua = props.modal.gasto.cantidad;
        const disponibleRestante = disponible + cantidadAntigua;

        // Validación: La nueva cantidad no puede ser mayor al disponible restante y al total
        if (cantidad > disponibleRestante) {
            error.value = "Has superado el dinero disponible";
            setTimeout(() => {
                error.value = "";
            }, 3000);
            return;
        }

        // Validación: La nueva cantidad no puede superar el total
        if (cantidad > total) {
            error.value = "Has superado el presupuesto total";
            setTimeout(() => {
                error.value = "";
            }, 3000);
            return;
        }

    } else {
        // Validación: La nueva cantidad no puede ser mayor al disponible
        if (cantidad > disponible) {
            error.value = "Has superado el dinero disponible";
            setTimeout(() => {
                error.value = "";
            }, 3000);
            return;
        }

        // Validación: La nueva cantidad no puede ser mayor al total
        if (cantidad > total) {
            error.value = "Has superado el presupuesto total";
            setTimeout(() => {
                error.value = "";
            }, 3000);
            return;
        }
    }

    emit("guardar-gasto", cantidad);
};


</script>




<template>
    <div class="modal">
        <div @click="emit('ocultar-modal')" class="cerrar-modal"><img :src="cerrarModal" alt="Cerrar" /></div>
        <div class="contenedor contenedor-formulario" :class="(modal.animar) ? 'animar' : 'cerrar'">
            <form class="nuevo-gasto" @submit.prevent="agregarGasto">
                <legend>Añadir Gasto</legend>
                <Alerta v-if="error !== ''">
                    <p>{{ error }}</p>
                </Alerta>
                <div class="campo">
                    <label for="nombre">Nombre Gasto:</label>
                    <input type="text" :value="nombre" id="nombre" placeholder="Añade el nombre del Gasto"
                        @input="emit('update:nombre', $event.target.value)" />
                </div>
                <div class="campo">
                    <label for="cantidad">Cantidad:</label>
                    <input type="number" :value="cantidad" id="cantidad" placeholder="Añade la cantidad del Gasto"
                        @input="emit('update:cantidad', +$event.target.value)" />
                </div>
                <div class="campo">
                    <label for="categoria">Categoría:</label>
                    <select :value="categoria" id="categoria" @input="emit('update:categoria', $event.target.value)">
                        <option value="">-- Selecciona --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Cesta compra</option>
                        <option value="casa">Casa</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="gastos">Gastos Varios</option>
                    </select>
                </div>
                <input type="submit" value="Añadir Gasto">

            </form>
        </div>
    </div>
</template>




<style>
.modal {
    position: absolute;
    background-color: rgb(0 0 0 / 0.9);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.cerrar-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
}

.cerrar-modal img {
    width: 3rem;
    cursor: pointer;
}

.nuevo-gasto {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
}

.nuevo-gasto legend {
    text-align: center;
    color: var(--blanco);
    font-size: 3rem;
    font-weight: 700;
}

.campo {
    display: grid;
    gap: 2rem;
}

.nuevo-gasto input,
.nuevo-gasto select {
    background-color: var(--gris-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
}

.nuevo-gasto label {
    color: var(--blanco);
    font-size: 3rem;
}

.nuevo-gasto input[type="submit"] {
    background-color: var(--azul);
    color: var(--blanco);
    font-weight: 700;
    cursor: pointer;
}

.contenedor-formulario {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    opacity: 0;
}

.contenedor-formulario.animar {
    opacity: 1;
}

.contenedor-formulario.cerrar {
    opacity: 0;
}
</style>