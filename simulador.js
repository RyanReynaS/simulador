/**
 * Función principal ejecutada al pulsar "Calcular Crédito"
 */
function calcular() {
    // 1. Limpia cualquier mensaje de error anterior
    limpiarErrores();

    // 2. Obtiene los valores ingresados eliminando espacios en blanco innecesarios
    let txtIngresos = document.getElementById("txtIngresos").value.trim();
    let txtEgresos = document.getElementById("txtEgresos").value.trim();
    let txtMonto = document.getElementById("txtMonto").value.trim();
    let txtPlazo = document.getElementById("txtPlazo").value.trim();
    let txtTasa = document.getElementById("txtTasaInteres").value.trim();

    // Variable tipo bandera para controlar si existe alguna falla
    let hayErrores = false;

    // --- REGLA 1: VALIDAR INGRESOS ---
    if (txtIngresos === "") {
        mostrarError("txtIngresos", "errIngresos", "El campo Ingresos es obligatorio.");
        hayErrores = true;
    } else if (isNaN(txtIngresos) || Number(txtIngresos) < 0) {
        mostrarError("txtIngresos", "errIngresos", "Debe ser un número mayor o igual a 0.");
        hayErrores = true;
    }

    // --- REGLA 2: VALIDAR EGRESOS ---
    if (txtEgresos === "") {
        mostrarError("txtEgresos", "errEgresos", "El campo Egresos es obligatorio.");
        hayErrores = true;
    } else if (isNaN(txtEgresos) || Number(txtEgresos) < 0) {
        mostrarError("txtEgresos", "errEgresos", "Debe ser un número mayor o igual a 0.");
        hayErrores = true;
    }

    // --- REGLA 3: VALIDAR MONTO DEL PRÉSTAMO ---
    if (txtMonto === "") {
        mostrarError("txtMonto", "errMonto", "El campo Monto es obligatorio.");
        hayErrores = true;
    } else if (isNaN(txtMonto) || Number(txtMonto) < 100 || Number(txtMonto) > 50000) {
        mostrarError("txtMonto", "errMonto", "El monto debe estar entre $100 y $50,000.");
        hayErrores = true;
    }

    // --- REGLA 4: VALIDAR PLAZO EN AÑOS ---
    if (txtPlazo === "") {
        mostrarError("txtPlazo", "errPlazo", "El campo Plazo es obligatorio.");
        hayErrores = true;
    } else if (isNaN(txtPlazo) || !Number.isInteger(Number(txtPlazo)) || Number(txtPlazo) < 1 || Number(txtPlazo) > 10) {
        mostrarError("txtPlazo", "errPlazo", "El plazo debe ser un entero entre 1 y 10 años.");
        hayErrores = true;
    }

    // --- REGLA 5: VALIDAR TASA DE INTERÉS ---
    if (txtTasa === "") {
        mostrarError("txtTasaInteres", "errTasaInteres", "El campo Tasa es obligatorio.");
        hayErrores = true;
    } else if (isNaN(txtTasa) || Number(txtTasa) < 1 || Number(txtTasa) > 40) {
        mostrarError("txtTasaInteres", "errTasaInteres", "La tasa debe estar entre 1% y 40%.");
        hayErrores = true;
    }

    // SI HAY ERRORES: Muestra mensaje genérico en estado de crédito y DETIENE el cálculo.
    if (hayErrores) {
        mostrarTexto("lblEstadoCredito", "DATOS INVÁLIDOS");
        return; // Sale de la función
    }

    // 3. SI NO HAY ERRORES: Convertir valores a números reales
    let ingresos = parseFloat(txtIngresos);
    let egresos = parseFloat(txtEgresos);
    let monto = parseFloat(txtMonto);
    let plazoAnios = parseInt(txtPlazo);
    let tasa = parseFloat(txtTasa);

    // 4. Realizar cálculos llamando a las funciones matemáticas de funciones.js
    let disponible = calcularDisponible(ingresos, egresos);[cite, 1, 4]
    mostrarTexto("lblDisponibleValor", "$" + disponible.toFixed(2));[cite, 4]

    let capacidadPago = calcularCapacidadPago(disponible);[cite, 1, 4]
    mostrarTexto("lblCapacidadValor", "$" + capacidadPago.toFixed(2));[cite, 4]

    let interes = calcularInteresSimple(monto, tasa, plazoAnios);[cite, 1, 4]
    mostrarTexto("lblInteresValor", "$" + interes.toFixed(2));[cite, 4]

    let totalPagar = calcularTotalPagar(monto, interes);[cite, 1, 4]
    mostrarTexto("lblTotalValor", "$" + totalPagar.toFixed(2));[cite, 4]

    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);[cite, 1, 4]
    mostrarTexto("lblCuotaValor", "$" + cuotaMensual.toFixed(2));[cite, 4]

    // 5. Determinar estado de aprobación
    let esAprobado = aprobarCredito(capacidadPago, cuotaMensual);[cite, 1, 4]
    if (esAprobado) {
        mostrarTexto("lblEstadoCredito", "CREDITO APROBADO");[cite, 4]
    } else {
        mostrarTexto("lblEstadoCredito", "CREDITO RECHAZADO");[cite, 4]
    }
}

/**
 * Función que resalta un input en rojo y escribe el texto del error debajo
 */
function mostrarError(idInput, idEtiquetaError, mensaje) {
    let inputElem = document.getElementById(idInput);
    let errorElem = document.getElementById(idEtiquetaError);

    if (inputElem) {
        inputElem.classList.add("input-error"); // Agrega borde y fondo rojo
    }
    if (errorElem) {
        errorElem.innerText = mensaje; // Inserta el mensaje explicativo
    }
}

/**
 * Función que remueve todas las marcas rojas y mensajes de error visuales
 */
function limpiarErrores() {
    // Quita la clase de error a todos los inputs
    let inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
        input.classList.remove("input-error");
    });

    // Limpia los textos de error
    let errores = document.querySelectorAll(".mensaje-error");
    errores.forEach(function (lbl) {
        lbl.innerText = "";
    });
}

/**
 * Función ejecutada al hacer clic en "Reiniciar"
 */
function reiniciarFormulario() {
    // Limpia marcas y mensajes rojas
    limpiarErrores();

    // Vaca todos los campos de texto
    let inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
        input.value = "";
    });

    // Restablece los textos de resultado
    mostrarTexto("lblDisponibleValor", "$0.00");
    mostrarTexto("lblCapacidadValor", "$0.00");
    mostrarTexto("lblInteresValor", "$0.00");
    mostrarTexto("lblTotalValor", "$0.00");
    mostrarTexto("lblCuotaValor", "$0.00");
    mostrarTexto("lblEstadoCredito", "POR EVALUAR");
}