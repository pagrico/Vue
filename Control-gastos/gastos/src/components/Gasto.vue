<script setup>
import IconoSuscripciones from "../assets/img/icono_suscripciones.svg"
import IconoSalud from "../assets/img/icono_salud.svg"
import IconoOcio from "../assets/img/icono_ocio.svg"
import IconoComida from "../assets/img/icono_comida.svg"
import IconoCasa from "../assets/img/icono_casa.svg"
import IconoAhorro from "../assets/img/icono_ahorro.svg"
import IconoGastos from "../assets/img/icono_gastos.svg"

const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
    gastos: IconoGastos,
};





defineProps({
    gasto: Object,
});
</script>


<template>
    <div class="gasto sombra">
        <div class="contenido">
            <img :src="diccionarioIconos[gasto.categoria]" alt="Icono gasto" class="icono" />
            <div class="detalles">
                <p class="categoría">{{ gasto.categoria }}</p>
                <p class="nombre">{{ gasto.nombre }}</p>
                <p class="fecha">
                    Fecha: <span>{{ gasto.fecha }}</span>
                </p>
            </div>
            <p class="cantidad">{{ gasto.cantidad }}</p>
        </div>
    </div>
</template>



<style scoped>
.gasto {
    background: white;
    border-radius: 10px;
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.contenido {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.detalles {
    display: flex;
    flex-direction: column;
}

.categoría {
    font-weight: bold;
    color: #007bff;
}

.nombre {
    font-size: 1.1rem;
}

.fecha {
    font-size: 0.9rem;
    color: gray;
}

.cantidad {
    font-size: 1.2rem;
    font-weight: bold;
    color: #28a745;
}

.gasto {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.contenido {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.icono {
    width: 5rem;
}

.detalles p {
    margin: 0 0 1rem 0;
}

.categoria {
    color: var(--gris);
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 900;
}

.nombre {
    color: var(--gris-oscuro);
    font-size: 2.4rem;
    font-weight: 700;
    cursor: pointer;
}

.fecha {
    color: var(--gris-oscuro);
    font-size: 1.6rem;
    font-weight: 900;
}

.fecha span {
    font-weight: 400;
}

.cantidad {
    font-size: 3rem;
    font-weight: 900;
    margin: 0;
}
</style>