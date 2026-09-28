// NIVEL 01 - Variables y tipos

const titular = "Sergio";
let saldoInicial = 1000;
const moneda = "€";

// Función que formatea una cantidad como dinero
function formatearDinero(cantidad) {
    return cantidad.toFixed(2).replace(".", ",") + " " + moneda;
}

console.log("Titular:", titular);
console.log("Saldo inicial:", formatearDinero(saldoInicial));
