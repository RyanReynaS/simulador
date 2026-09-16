/**
 * Recupera un valor desde el formulario como Float
 */
function recuperarFloat(idComponente) {
    let valor = document.getElementById(idComponente).value;
    return parseFloat(valor) || 0;
}

/**
 * Recupera un valor desde el formulario como Integer
 */
function recuperarEntero(idComponente) {
    let valor = document.getElementById(idComponente).value;
    return parseInt(valor) || 0;
}

/**
 * Modifica el texto de cualquier elemento HTML especificado por idComponente
 */
function mostrarTexto(idComponente, mensaje) {
    document.getElementById(idComponente).innerText = mensaje;
}