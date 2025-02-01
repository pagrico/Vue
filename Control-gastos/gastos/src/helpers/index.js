
export function formato(numero) {

    return numero.toLocaleString("es-ES", { style: "currency", currency: "EUR" })

}

export const generarId = () => {
    const fecha = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return fecha + random;
  }