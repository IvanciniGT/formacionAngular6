
function saluda(nombre) {
    console.log("Hola, " + nombre + "!");
}

saluda("Menchu");
saluda("Federico");

let miVariable = "hola";

miVariable = saluda; // Estas dos lineas son programación funcional
miVariable("Menchu");

function generarSaludoFormal(nombre) {
    return "Buenos días, " + nombre + ". Es un placer conocerte.";
}

function generarSaludoInformal(nombre) {
    return "¡Hola, " + nombre + "! ¿Cómo estás?";
}

function imprimirSaludo(funcionGeneradoraDeSaludos, nombre) {
    const saludo = funcionGeneradoraDeSaludos(nombre);
    console.log(saludo);
}

imprimirSaludo(generarSaludoFormal, "Menchu");
imprimirSaludo(generarSaludoInformal, "Federico");
//imprimirSaludo(generarSaludoInformal("Federico"));

function imprimirDoble(numero)  {
    const resultado = numero * 2;
    console.log(resultado);
}

function imprimirResultadoDeUnaOperacion(operacion, numero)  {
    const resultado = operacion(numero);
    console.log(resultado);
}

function doble(numero) {
    return numero * 2;
}
function triple(numero) {
    return numero * 3;
}

imprimirDoble(5);
imprimirResultadoDeUnaOperacion(doble, 5);
imprimirResultadoDeUnaOperacion(triple, 5);

// En el mundo del desarrollo de frontales web (en general en el mundo de desarrollo de frontales) esto se usa un huevo
// por necesidad.
// Porque la programación de frontales se basa en ASINCRONIA! Trabajos asíncronos!

// Qué entendemos por asincronía? COMUNICACION ASINCRONA?