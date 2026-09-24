// ==========================================
// ARCHIVO: simulador.js
// TALLER: Simulador de Crédito
// ==========================================
// Este es el "director de orquesta": no hace cálculos matemáticos él
// mismo (eso lo delega a funciones.js) y no sabe leer/escribir el HTML
// "a mano" (eso lo delega a utilitarios.js). Su trabajo es: leer los
// datos del formulario, validarlos, y si están bien, llamar a las
// funciones de cálculo en el orden correcto y mostrar los resultados.

/**
 * Función principal ejecutada al pulsar "Calcular Crédito"
 */
function calcular() {
    // 1. Limpia cualquier mensaje de error anterior (de un intento previo)
    limpiarErrores();

    // 2. Obtiene los valores ingresados eliminando espacios en blanco innecesarios.
    // Se leen como TEXTO (con .value) y con .trim() porque todavía no se
    // valida si son números válidos: validar antes de convertir es la
    // clave de este diseño (si conviertes primero, pierdes la posibilidad
    // de distinguir "vacío" de "0" o de mostrar errores específicos).
    let txtIngresos = document.getElementById("txtIngresos").value.trim();
    let txtEgresos = document.getElementById("txtEgresos").value.trim();
    let txtMonto = document.getElementById("txtMonto").value.trim();
    let txtPlazo = document.getElementById("txtPlazo").value.trim();
    let txtTasa = document.getElementById("txtTasaInteres").value.trim();

    // Variable tipo BANDERA (flag) para controlar si existe alguna falla.
    // Empieza en false y se pone en true apenas UNA validación falla.
    // Con esto se pueden mostrar TODOS los errores de una vez, en vez de
    // detenerse en el primero.
    let hayErrores = false;

    // --- REGLA 1: VALIDAR INGRESOS ---
    if (txtIngresos === "") {
        // Campo vacío: error de obligatoriedad
        mostrarError("txtIngresos", "errIngresos", "El campo Ingresos es obligatorio.");
        hayErrores = true;
    } else if (isNaN(txtIngresos) || Number(txtIngresos) < 0) {
        // isNaN(texto) = true si el texto NO se puede interpretar como número
        // Number(texto) < 0 = el número es negativo (no tiene sentido en ingresos)
        mostrarError("txtIngresos", "errIngresos", "Debe ser un número mayor o igual a 0.");
        hayErrores = true;
    }

    // --- REGLA 2: VALIDAR EGRESOS ---
    // Mismo patrón que Ingresos: obligatorio y no puede ser negativo
    if (txtEgresos === "") {
        mostrarError("txtEgresos", "errEgresos", "El campo Egresos es obligatorio.");
        hayErrores = true;
    } else if (isNaN(txtEgresos) || Number(txtEgresos) < 0) {
        mostrarError("txtEgresos", "errEgresos", "Debe ser un número mayor o igual a 0.");
        hayErrores = true;
    }

    // --- REGLA 3: VALIDAR MONTO DEL PRÉSTAMO ---
    // Además de obligatorio y no negativo, el monto tiene un RANGO permitido
    if (txtMonto === "") {
        mostrarError("txtMonto", "errMonto", "El campo Monto es obligatorio.");
        hayErrores = true;
    } else if (isNaN(txtMonto) || Number(txtMonto) < 100 || Number(txtMonto) > 50000) {
        // El monto debe estar entre $100 y $50,000 (reglas de negocio del taller)
        mostrarError("txtMonto", "errMonto", "El monto debe estar entre $100 y $50,000.");
        hayErrores = true;
    }

    // --- REGLA 4: VALIDAR PLAZO EN AÑOS ---
    if (txtPlazo === "") {
        mostrarError("txtPlazo", "errPlazo", "El campo Plazo es obligatorio.");
        hayErrores = true;
    } else if (isNaN(txtPlazo) || !Number.isInteger(Number(txtPlazo)) || Number(txtPlazo) < 1 || Number(txtPlazo) > 10) {
        // Number.isInteger(x) = true SOLO si x es un entero exacto (sin decimales)
        // El plazo debe ser un entero entre 1 y 10 años
        mostrarError("txtPlazo", "errPlazo", "El plazo debe ser un entero entre 1 y 10 años.");
        hayErrores = true;
    }

    // --- REGLA 5: VALIDAR TASA DE INTERÉS ---
    if (txtTasa === "") {
        mostrarError("txtTasaInteres", "errTasaInteres", "El campo Tasa es obligatorio.");
        hayErrores = true;
    } else if (isNaN(txtTasa) || Number(txtTasa) < 1 || Number(txtTasa) > 40) {
        // La tasa debe estar entre 1% y 40% (evita tasas absurdas)
        mostrarError("txtTasaInteres", "errTasaInteres", "La tasa debe estar entre 1% y 40%.");
        hayErrores = true;
    }

    // SI HAY ERRORES: Muestra mensaje genérico en estado de crédito y DETIENE el cálculo.
    if (hayErrores) {
        mostrarTexto("lblEstadoCredito", "DATOS INVÁLIDOS");
        // El "return" sin nada después corta la ejecución de la función AQUÍ.
        // Es clave: sin este return, el código seguiría intentando calcular
        // con datos inválidos (ej: parseFloat("") da NaN, y NaN contamina
        // en cadena TODOS los cálculos siguientes, mostrando "NaN" en pantalla).
        return;
    }

    // 3. SI NO HAY ERRORES: Convertir los textos ya validados a números reales.
    // Recién AHORA es seguro convertir, porque ya sabemos que son válidos.
    let ingresos = parseFloat(txtIngresos);
    let egresos = parseFloat(txtEgresos);
    let monto = parseFloat(txtMonto);
    let plazoAnios = parseInt(txtPlazo);
    let tasa = parseFloat(txtTasa);

    // 4. Realizar cálculos llamando a las funciones matemáticas de funciones.js,
    // ENCADENADAS: cada resultado alimenta al siguiente cálculo.
    // (NOTA: aquí originalmente había fragmentos de texto "[cite, 1, 4]" pegados
    // al final de estas líneas -probablemente un copy-paste accidental desde un
    // PDF con citas-. Eso ROMPÍA el código: JavaScript los leía como una
    // instrucción real "[cite, 1, 4];" y como la variable "cite" no existe en
    // ningún lado, lanzaba el error "cite is not defined" apenas se ejecutaba
    // esta función, deteniendo TODO el cálculo a la mitad. Ya los quité.)

    // Disponible = ingresos - egresos (con el piso en 0)
    let disponible = calcularDisponible(ingresos, egresos);
    mostrarTexto("lblDisponibleValor", "$" + disponible.toFixed(2));

    // Capacidad de pago = 50% del disponible que acabamos de calcular
    let capacidadPago = calcularCapacidadPago(disponible);
    mostrarTexto("lblCapacidadValor", "$" + capacidadPago.toFixed(2));

    // Interés simple según monto, tasa y plazo (independiente de lo anterior)
    let interes = calcularInteresSimple(monto, tasa, plazoAnios);
    mostrarTexto("lblInteresValor", "$" + interes.toFixed(2));

    // Total a pagar = monto + interés + cargo fijo de $100
    let totalPagar = calcularTotalPagar(monto, interes);
    mostrarTexto("lblTotalValor", "$" + totalPagar.toFixed(2));

    // Cuota mensual = total dividido entre el número de meses del plazo
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    mostrarTexto("lblCuotaValor", "$" + cuotaMensual.toFixed(2));

    // 5. Determinar estado de aprobación: ¿la capacidad de pago alcanza
    // para cubrir la cuota mensual?
    let esAprobado = aprobarCredito(capacidadPago, cuotaMensual);
    if (esAprobado) {
        mostrarTexto("lblEstadoCredito", "CREDITO APROBADO");
    } else {
        mostrarTexto("lblEstadoCredito", "CREDITO RECHAZADO");
    }
}

/**
 * Función que resalta un input en rojo y escribe el texto del error debajo.
 * Se llama una vez por cada regla de validación que falla.
 */
function mostrarError(idInput, idEtiquetaError, mensaje) {
    let inputElem = document.getElementById(idInput);
    let errorElem = document.getElementById(idEtiquetaError);

    if (inputElem) {
        // classList.add agrega la clase CSS "input-error" (borde y fondo rojo,
        // definidos en simulador.css)
        inputElem.classList.add("input-error");
    }
    if (errorElem) {
        // Escribe el mensaje explicativo en el <small> correspondiente a ese campo
        errorElem.innerText = mensaje;
    }
}

/**
 * Función que remueve todas las marcas rojas y mensajes de error visuales.
 * Se llama al INICIO de calcular(), para que un intento nuevo no arrastre
 * errores visuales de un intento anterior ya corregido.
 */
function limpiarErrores() {
    // querySelectorAll("input") devuelve UNA LISTA con todos los <input> de la página
    let inputs = document.querySelectorAll("input");
    // forEach recorre esa lista y ejecuta la función indicada por cada elemento
    inputs.forEach(function (input) {
        // classList.remove quita la clase "input-error" (si la tenía)
        input.classList.remove("input-error");
    });

    // Igual, pero con todos los elementos que tengan la clase "mensaje-error"
    let errores = document.querySelectorAll(".mensaje-error");
    errores.forEach(function (lbl) {
        // Vacía el texto de cada mensaje de error
        lbl.innerText = "";
    });
}

/**
 * Función ejecutada al hacer clic en "Reiniciar".
 * Deja el formulario exactamente como al abrir la página por primera vez.
 */
function reiniciarFormulario() {
    // Limpia marcas y mensajes rojos
    limpiarErrores();

    // Vacía todos los campos de texto del formulario
    let inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
        input.value = "";
    });

    // Restablece los textos de resultado a sus valores iniciales
    mostrarTexto("lblDisponibleValor", "$0.00");
    mostrarTexto("lblCapacidadValor", "$0.00");
    mostrarTexto("lblInteresValor", "$0.00");
    mostrarTexto("lblTotalValor", "$0.00");
    mostrarTexto("lblCuotaValor", "$0.00");
    mostrarTexto("lblEstadoCredito", "POR EVALUAR");
}
