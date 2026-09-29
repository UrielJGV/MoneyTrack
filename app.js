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
        `;

        tablaMovimientos.appendChild(fila);
    }
}

// Mostramos inicialmente todos los movimientos
pintarTabla(movimientos);

// Cuando cambia el filtro, mostramos solo esa categoría
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
