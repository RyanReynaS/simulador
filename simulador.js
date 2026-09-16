function calcular() {
    // Paso 3: Leer ingresos, egresos y calcular disponible
    let ingresos = recuperarFloat("txtIngresos");
    let egresos = recuperarFloat("txtEgresos");
    let disponible = calcularDisponible(ingresos, egresos);
    mostrarTexto("lblDisponibleValor", disponible.toFixed(2));

    // Paso 5: Calcular y mostrar capacidad de pago
    let capacidadPago = calcularCapacidadPago(disponible);
    mostrarTexto("lblCapacidadValor", capacidadPago.toFixed(2));

    // Paso 7: Leer datos del préstamo y calcular interés simple
    let monto = recuperarEntero("txtMonto");
    let plazoAnios = recuperarEntero("txtPlazo");
    let tasa = recuperarEntero("txtTasaInteres");
    let interes = calcularInteresSimple(monto, tasa, plazoAnios);
    mostrarTexto("lblInteresValor", interes.toFixed(2));

    // Paso 9: Calcular y mostrar total a pagar
    let totalPagar = calcularTotalPagar(monto, interes);
    mostrarTexto("lblTotalValor", totalPagar.toFixed(2));

    // Paso 11: Calcular y mostrar cuota mensual
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    mostrarTexto("lblCuotaValor", cuotaMensual.toFixed(2));

    // Paso 14: Evaluar la aprobación del crédito
    let esAprobado = aprobarCredito(capacidadPago, cuotaMensual);
    if (esAprobado) {
        mostrarTexto("lblEstadoCredito", "CREDITO APROBADO");
    } else {
        mostrarTexto("lblEstadoCredito", "CREDITO RECHAZADO");
    }
}