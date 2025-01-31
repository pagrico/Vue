
export function formato(numero) {

    return numero.toLocaleString("es-ES", { style: "currency", currency: "EUR" })

}
