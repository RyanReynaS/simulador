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
