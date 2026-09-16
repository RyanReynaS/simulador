// Paso 2
function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    return disponible < 0 ? 0 : disponible;
}

// Paso 4
function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.50;
}

// Paso 6
function calcularInteresSimple(monto, tasa, plazoAnios) {
    return plazoAnios * monto * (tasa / 100);
}

// Paso 8
function calcularTotalPagar(monto, interes) {
    return monto + interes + 100; // Incluye USD 100 por impuestos y SOLCA
}

// Paso 10
function calcularCuotaMensual(total, plazoAnios) {
    let plazoMeses = plazoAnios * 12;
    return total / plazoMeses;
}

// Paso 13
function aprobarCredito(capacidadPago, cuotaMensual) {
    return capacidadPago > cuotaMensual;
}