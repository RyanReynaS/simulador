function calcular() {
    // Paso 3: Leer ingresos, egresos y calcular disponible
    let ingresos = recuperarFloat("txtIngresos");
    let egresos = recuperarFloat("txtEgresos");
    let disponible = calcularDisponible(ingresos, egresos);
    mostrarTexto("lblDisponibleValor", disponible.toFixed(2));
}