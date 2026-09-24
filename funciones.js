// ==========================================
// ARCHIVO: funciones.js
// TALLER: Simulador de Crédito
// ==========================================
// Este archivo contiene SOLO cálculos matemáticos puros: reciben números,
// devuelven números. Ninguna de estas funciones toca el HTML directamente
// (eso lo hace simulador.js, que las llama y pinta el resultado en pantalla).

// ==========================================
// FUNCIÓN: Calcular el disponible mensual
// ==========================================
// Paso 2 del taller. Recibe los ingresos y egresos de la persona y
// calcula cuánto dinero le queda libre a fin de mes.
function calcularDisponible(ingresos, egresos) {
    // Restamos los egresos (gastos) de los ingresos
    let disponible = ingresos - egresos;
    // Si el resultado es negativo (gasta más de lo que gana), no tiene
    // sentido un "disponible negativo": el operador ternario dice
    // "si disponible < 0, dame 0; si no, dame disponible tal cual"
    return disponible < 0 ? 0 : disponible;
}

// ==========================================
// FUNCIÓN: Calcular la capacidad de pago
// ==========================================
// Paso 4 del taller. La capacidad de pago es el 50% de lo disponible:
// se asume que la persona no debería comprometer más de la mitad de
// su dinero libre en pagar una cuota.
function calcularCapacidadPago(montoDisponible) {
    // Multiplicar por 0.50 es lo mismo que dividir para 2
    return montoDisponible * 0.30;
}

// ==========================================
// FUNCIÓN: Calcular el interés simple
// ==========================================
// Paso 6 del taller. Fórmula del interés simple:
//   interés = plazo(años) x monto x (tasa / 100)
function calcularInteresSimple(monto, tasa, plazoAnios) {
    // La tasa llega como un número "normal" (ej: 10, que significa 10%).
    // Para usarla en una multiplicación hay que convertirla a proporción
    // (10 / 100 = 0.10). Si te olvidas de dividir para 100, el interés
    // sale 100 veces más grande de lo real.
    return plazoAnios * monto * (tasa / 100);
}

// ==========================================
// FUNCIÓN: Calcular el total a pagar
// ==========================================
// Paso 8 del taller. Suma el capital (monto) + el interés generado,
// más un cargo FIJO de USD 100 (impuestos y contribución a SOLCA,
// según el enunciado del taller).
function calcularTotalPagar(monto, interes) {
    // El 100 está "hardcodeado" (escrito directo en el código).
    // Si te preguntan qué cambiarías: sacarlo a una constante con
    // nombre, ej: const CARGO_SOLCA = 100;
    return monto + interes + 100;
}

// ==========================================
// FUNCIÓN: Calcular la cuota mensual
// ==========================================
// Paso 10 del taller. El taller da el plazo en AÑOS, pero la cuota es
// MENSUAL, así que primero hay que convertir años a meses.
function calcularCuotaMensual(total, plazoAnios) {
    // 1 año = 12 meses, entonces multiplicamos por 12
    let plazoMeses = plazoAnios * 12;
    // Dividimos el total entre el número de meses para obtener la cuota
    return total / plazoMeses;
}

// ==========================================
// FUNCIÓN: Aprobar o rechazar el crédito
// ==========================================
// Paso 13 del taller. Compara si lo que la persona PUEDE pagar
// (capacidadPago) alcanza para cubrir la CUOTA mensual del préstamo.
function aprobarCredito(capacidadPago, cuotaMensual) {
    // Retorna true/false (booleano), NUNCA un texto como "APROBADO".
    // Esta función vive en la capa de cálculo puro: no le corresponde
    // decidir qué mensaje mostrar, eso es trabajo de simulador.js.
    return capacidadPago > cuotaMensual;
}
