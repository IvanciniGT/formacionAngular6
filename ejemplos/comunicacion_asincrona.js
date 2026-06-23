// 2 grandes estrategias para comunicación asincrona:
// - Funciones callback
// - Promesas

// Yo soy una persona haciendo mis recados.. de sábado por la mañana

async function operarioPoneCamisaALavar( segundos ){
    console.log("  Se pone a lavar la camisa, esto tarda un rato..");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("  Después de un rato, acaba lavando la camisa y me la devuelve limpia y planchada");
            resolve();
        }, segundos * 1000);
    });
}
// En JS cualquier función async devuelve una promesa, aunque no lo diga explícitamente.
// Incluso cuando yo, en el código de la función, no devuelva nada, la promesa se resuelve con undefined.
// Y al poner async, el código que hay dentro de la función se ejecuta de manera asíncrona, 
// es decir, no bloquea la ejecución de otras tareas.
async function entregoLaCamisaAlDeRecepcion() {
    console.log(" Entregar la camisa a la tintorería");
    console.log(" Recoger un ticket: 'Voy a hacer mi mejor intento por darte la camisa, te lo Prometo!'"); // El ticket = PROMESA
    console.log(" Ponen a lavar la camisa");
    return operarioPoneCamisaALavar(5);
}


console.log("Voy a llevar una camisa a la tintorería");
const ticket = entregoLaCamisaAlDeRecepcion();
// Dejo preprogramado(preestablecido) lo que quiero que ocurra (se ejecute) cuando se resuelva la promesa, es decir, cuando la camisa esté limpia.
//ticket.then(cuandoAcabeDeLavarseLaCamisa); // Cuando se resuelva la promesa, se ejecuta la función que le paso como parámetro.
// Para casos donde no quiero REUSAR UNA FUNCION.
// Y el tener definida la función de forma tradicional no me aporta valor (no mejora legibilidad... de hecho la empeora)
// Los lenguajes que soportan programación funcional: JS,TS, JAVA, PYTHON, C#... definen una nueva sintaxis para definir funciones de forma más concisa
// Esa sintaxis se llama: EXPRESIONES LAMBDA!
// Qué es una expresión LAMBDA? De entrada una EXPRESION.
// Qué es una EXPRESION en un código?
//const numero = 3 + 56;                     // Otro statement . Otra frase
                /////// Expresión = Trozo de código que DEVUELVE UN VALOR
// Una expresión LAMBDA, es un trozo de código que devuelve una función ANONIMA (sin nombre) definida DENTRO DE LA PROPIA EXPRESION
// Es una sintaxis alternativa a la hora de DEFINIR FUNCIONES.

ticket.then(()=>console.log("Me paso por la tintorería a recoger la camisa limpia y planchada"))
      .catch(()=>console.log("Se ha quemado la camisa y no me la pueden dar."))
      .finally(()=>console.log("En cualquier caso, doy las gracias.. que es de bien nacido ser agradecido"));

// Esta es la sintaxis habitual en este tipo de proyectos.

console.log("Voy a comprar el periódico"); /// Statement = Sentencia (FRASE | ORACION)
console.log("Voy a tomar el café");
console.log("Voy a dar un paseo");

//console.log("Voy a la tintorería a recoger la camisa. Entrego ticket.. y espero a que me devuelvan la camisa limpia y planchada");
//await ticket; // Aquí me quedo esperando a que se resuelva la promesa, es decir, a que me devuelvan la camisa limpia y planchada.
//console.log("Me entregan la camisa y listo, les doy las gracias");

console.log("Me voy a casa");

// Angular usa una librería llamada rxJS, que es una librería para manejar programación funcional y asincrona.
// Esa librería trabaja con un tipo de dato llamado "Observable"
// Un observable es como una promesa! Pero, mientras que una promesa se resuelve con un valor!
// Un observable puede estar emitiendo valores a lo largo del tiempo.
// Con un observable, lo que dejo configurado (la función que dejo programada) es lo que quiero que ocurra cada vez que se emita un valor.
