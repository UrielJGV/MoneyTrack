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

const saldoInicial = 1000;

function formatearDinero(valor) {
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR"
    }).format(valor);
}

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
