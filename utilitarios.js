// ==========================================
// ARCHIVO: utilitarios.js (simulador)
// ==========================================
// Funciones auxiliares reutilizables para leer datos del formulario
// y para escribir texto en pantalla. Existen para no repetir
// "document.getElementById(...)" una y otra vez en simulador.js.

// ==========================================
// FUNCIÓN: Recuperar un valor como número DECIMAL (Float)
// ==========================================
// Busca un elemento del HTML por su id, toma lo que el usuario escribió
// (.value, que SIEMPRE es texto) y lo convierte a número decimal.
function recuperarFloat(idComponente) {
    let valor = document.getElementById(idComponente).value;
    // parseFloat convierte texto a número con decimales (ej: "125.5" -> 125.5)
    // Si el texto no se puede convertir (ej: vacío o letras), parseFloat
    // devuelve NaN ("Not a Number"). El "|| 0" hace que en ese caso la
    // función devuelva 0 en vez de un valor inválido que rompa los cálculos.
    return parseFloat(valor) || 0;
}

// ==========================================
// FUNCIÓN: Recuperar un valor como número ENTERO (Integer)
// ==========================================
// Igual que recuperarFloat, pero sin decimales (para el plazo en años,
// que siempre debería ser un número entero).
function recuperarEntero(idComponente) {
    let valor = document.getElementById(idComponente).value;
    // parseInt convierte texto a número entero (ej: "3.7" -> 3, corta los decimales)
    return parseInt(valor) || 0;
}

// NOTA PARA TI: en la versión final de simulador.js, la función calcular()
// en realidad NO usa recuperarFloat/recuperarEntero directamente. En su
// lugar, primero valida el texto (isNaN, rangos, etc.) y recién después
// usa parseFloat/parseInt manualmente sobre el texto ya validado. Estas
// dos funciones quedaron como utilidades disponibles, pero el flujo final
// las reemplazó porque necesitaba validar ANTES de convertir a número
// (para poder mostrar mensajes de error específicos por campo).

// ==========================================
// FUNCIÓN: Mostrar texto en cualquier elemento del HTML
// ==========================================
// Busca un elemento por su id y le cambia el texto visible.
// Es la función que usa simulador.js una y otra vez para pintar cada
// resultado (lblDisponibleValor, lblCapacidadValor, lblEstadoCredito, etc.)
function mostrarTexto(idComponente, mensaje) {
    // innerText cambia el texto que se ve en pantalla dentro de ese elemento
    document.getElementById(idComponente).innerText = mensaje;
}
