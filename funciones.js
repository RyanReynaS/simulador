// Paso 2: Calcula el disponible restando egresos de los ingresos
function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    // Si da negativo, retorna 0
    return disponible < 0 ? 0 : disponible;
}

// Paso 4: La capacidad de pago es el 50% del monto disponible
function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.50;
}

// Paso 6: Calcula el interés simple: plazoAnios * monto * (tasa / 100)
function calcularInteresSimple(monto, tasa, plazoAnios) {
    return plazoAnios * monto * (tasa / 100);
}

// Paso 8: Suma el monto, el interés y USD 100 fijos de impuestos/SOLCA
function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

// Paso 10: Divide el total a pagar para el número total de meses (plazoAnios * 12)
function calcularCuotaMensual(total, plazoAnios) {
    let plazoMeses = plazoAnios * 12;
    return total / plazoMeses;
}

// Paso 13: El crédito se aprueba si la capacidad de pago es mayor a la cuota mensual
function aprobarCredito(capacidadPago, cuotaMensual) {
    return capacidadPago > cuotaMensual;
}