// Paso 2
function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    return disponible < 0 ? 0 : disponible;
}

// Paso 4
function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.50;
}

