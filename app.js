// NIVEL 01 - Variables y tipos

const titular = "Sergio";
let saldoInicial = 1000;
const moneda = "€";

// Función que formatea una cantidad como dinero
function formatearDinero(cantidad) {
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR"
    }).format(cantidad);
}

console.log("Titular:", titular);
console.log("Saldo inicial:", formatearDinero(saldoInicial));

// NIVEL 02 - Array de movimientos

const movimientos = [
    {
        id: 1,
        concepto: "Nómina",
        importe: 1500,
        categoria: "Ingresos",
        fecha: "2026-09-01"
    },
    {
        id: 2,
        concepto: "Supermercado",
        importe: -85.50,
        categoria: "Comida",
        fecha: "2026-09-03"
    },
    {
        id: 3,
        concepto: "Cine",
        importe: -25,
        categoria: "Ocio",
        fecha: "2026-09-05"
    },
    {
        id: 4,
        concepto: "Gasolina",
        importe: -60,
        categoria: "Transporte",
        fecha: "2026-09-07"
    },
    {
        id: 5,
        concepto: "Venta de consola",
        importe: 200,
        categoria: "Ingresos",
        fecha: "2026-09-10"
    },
    {
        id: 6,
        concepto: "Restaurante",
        importe: -45,
        categoria: "Comida",
        fecha: "2026-09-12"
    }
];

console.log("Movimientos:", movimientos); 
// NIVEL 03 - Cálculos con funciones y bucles

// Calcula el total de los ingresos
function totalIngresos() {
    let total = 0;

    for (let movimiento of movimientos) {
        if (movimiento.importe > 0) {
            total += movimiento.importe;
        }
    }

    return total;
}

// Calcula el total de los gastos
function totalGastos() {
    let total = 0;

    for (let movimiento of movimientos) {
        if (movimiento.importe < 0) {
            total += movimiento.importe;
        }
    }

    return total;
}

// Calcula el saldo actual
function saldoActual() {
    return saldoInicial + totalIngresos() + totalGastos();
}

console.log("Total ingresos:", formatearDinero(totalIngresos()));
console.log("Total gastos:", formatearDinero(totalGastos()));
console.log("Saldo actual:", formatearDinero(saldoActual()));

// NIVEL 04 - Tabla y filtro

// Obtiene el cuerpo de la tabla
const tablaMovimientos = document.getElementById("tablaMovimientos");

// Obtiene el selector del filtro
const filtroCategoria = document.getElementById("filtroCategoria");

// Función que pinta los movimientos en la tabla
function pintarTabla(listaMovimientos) {

    tablaMovimientos.innerHTML = "";

    for (let movimiento of listaMovimientos) {

        const fila = document.createElement("tr");

        const claseImporte = movimiento.importe > 0 ? "ingreso" : "gasto";

        fila.innerHTML = `
            <td>${movimiento.id}</td>
            <td>${movimiento.concepto}</td>
            <td class="${claseImporte}">
                ${formatearDinero(movimiento.importe)}
            </td>
            <td>${movimiento.categoria}</td>
            <td>${movimiento.fecha}</td>
            <td>
                <button class="boton-borrar" onclick="borrarMovimiento(${movimiento.id})">
                    Borrar
                </button>
            </td>
        `;

        tablaMovimientos.appendChild(fila);
    }
}

// Mostramos inicialmente todos los movimientos
pintarTabla(movimientos);

filtroCategoria.addEventListener("change", function () {

    const categoriaSeleccionada = filtroCategoria.value;

    if (categoriaSeleccionada === "Todas") {

        pintarTabla(movimientos);

    } else {

        const movimientosFiltrados = movimientos.filter(function (movimiento) {
            return movimiento.categoria === categoriaSeleccionada;
        });

        pintarTabla(movimientosFiltrados);
    }
});
// NIVEL 05 - Estadísticas

const totalGastadoElemento = document.getElementById("totalGastado");
const categoriaMayorGastoElemento = document.getElementById("categoriaMayorGasto");

// Calcula cuánto se ha gastado en cada categoría
function gastosPorCategoria() {

    return movimientos.reduce(function (acumulador, movimiento) {

        if (movimiento.importe < 0) {

            const categoria = movimiento.categoria;

            if (!acumulador[categoria]) {
                acumulador[categoria] = 0;
            }

            acumulador[categoria] += Math.abs(movimiento.importe);
        }

        return acumulador;

    }, {});
}

// Busca la categoría donde más dinero se ha gastado
function obtenerCategoriaMayorGasto() {

    const gastos = gastosPorCategoria();

    let categoriaMayor = "";
    let cantidadMayor = 0;

    for (let categoria in gastos) {

        if (gastos[categoria] > cantidadMayor) {
            cantidadMayor = gastos[categoria];
            categoriaMayor = categoria;
        }
    }

    return categoriaMayor;
}
// Calcula el total gastado utilizando reduce()
function calcularTotalGastado() {

    const total = movimientos.reduce(function (acumulador, movimiento) {

        if (movimiento.importe < 0) {
            return acumulador + movimiento.importe;
        }

        return acumulador;

    }, 0);

    return total;
}

// Muestra las estadísticas en la página
function pintarEstadisticas() {

    const totalGastado = calcularTotalGastado();
    const categoriaMayor = obtenerCategoriaMayorGasto();

    totalGastadoElemento.textContent = formatearDinero(
        Math.abs(totalGastado)
    );

    categoriaMayorGastoElemento.textContent = categoriaMayor;
}

// Actualiza la tabla y las estadísticas
function refrescar() {

    const categoriaSeleccionada = filtroCategoria.value;

    if (categoriaSeleccionada === "Todas") {

        pintarTabla(movimientos);

    } else {

        const movimientosFiltrados = movimientos.filter(function (movimiento) {
            return movimiento.categoria === categoriaSeleccionada;
        });

        pintarTabla(movimientosFiltrados);
    }

    pintarEstadisticas();
}

pintarEstadisticas();

// NIVEL 06 - Formulario

const formulario = document.getElementById("formMovimiento");
const conceptoInput = document.getElementById("concepto");
const importeInput = document.getElementById("importe");
const categoriaInput = document.getElementById("categoria");

// Elimina un movimiento por su id
function borrarMovimiento(id) {
    const indice = movimientos.findIndex(function (movimiento) {
        return movimiento.id === id;
    });

    if (indice !== -1) {
        movimientos.splice(indice, 1);

        const categoriaSeleccionada = filtroCategoria.value;

        if (categoriaSeleccionada === "Todas") {
            pintarTabla(movimientos);
        } else {
            const movimientosFiltrados = movimientos.filter(function (movimiento) {
                return movimiento.categoria === categoriaSeleccionada;
            });

            pintarTabla(movimientosFiltrados);
        }

        pintarEstadisticas();
    }
}

// Añade un nuevo movimiento
formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const concepto = conceptoInput.value.trim();
    const importe = Number(importeInput.value);
    const categoria = categoriaInput.value;

    // Validación
    if (concepto === "") {
        alert("El concepto no puede estar vacío.");
        return;
    }

    if (isNaN(importe)) {
        alert("El importe debe ser un número.");
        return;
    }

    if (categoria === "") {
        alert("Debes seleccionar una categoría.");
        return;
    }

    // Crear nuevo movimiento
    const nuevoMovimiento = {
        id: movimientos.length > 0
            ? Math.max(...movimientos.map(movimiento => movimiento.id)) + 1
            : 1,

        concepto: concepto,
        importe: importe,
        categoria: categoria,
        fecha: new Date().toISOString().split("T")[0]
    };

    // Añadirlo al array
    movimientos.push(nuevoMovimiento);

    // Limpiar formulario
    formulario.reset();

    // Actualizar la aplicación
    refrescar();
});