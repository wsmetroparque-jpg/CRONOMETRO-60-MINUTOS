/* =========================================================
   TIEMPOS ATENCIÓN CD GALAPA
   CRONÓMETRO DE 60 MINUTOS
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const DURACION_MINUTOS = 60;

const DURACION_SEGUNDOS =
    DURACION_MINUTOS * 60;


/* =========================================================
   VARIABLES
========================================================= */

let tiempoRestante =
    DURACION_SEGUNDOS;

let intervalo = null;

let ejecutando = false;

let alertasEjecutadas = {};


/* =========================================================
   ELEMENTOS
========================================================= */

const reloj =
    document.getElementById("reloj");

const mensaje =
    document.getElementById("mensaje");

const btnIniciar =
    document.getElementById("btnIniciar");

const btnFinalizar =
    document.getElementById("btnFinalizar");

const btnReiniciar =
    document.getElementById("btnReiniciar");

const btnPantalla =
    document.getElementById("btnPantalla");


const alerta15 =
    document.getElementById("alerta15");

const alerta10 =
    document.getElementById("alerta10");

const alerta5 =
    document.getElementById("alerta5");

const alerta1 =
    document.getElementById("alerta1");


/* =========================================================
   AUDIO
========================================================= */

let audioContext = null;


function prepararAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }

}


/* =========================================================
   MOSTRAR TIEMPO
========================================================= */

function actualizarReloj() {

    const minutos =
        Math.floor(
            tiempoRestante / 60
        );


    const segundos =
        tiempoRestante % 60;


    reloj.textContent =

        String(minutos).padStart(2, "0")
        +
        ":"
        +
        String(segundos).padStart(2, "0");

}


/* =========================================================
   INICIAR
========================================================= */

function iniciar() {


    if (ejecutando) {

        return;

    }


    if (tiempoRestante <= 0) {

        return;

    }


    prepararAudio();


    ejecutando = true;


    btnIniciar.disabled = true;

    btnFinalizar.disabled = false;


    mensaje.textContent =
        "● ATENCIÓN SIDER EN CURSO";


    limpiarAlertasVisuales();


    intervalo =
        setInterval(
            contarSegundo,
            1000
        );

}


/* =========================================================
   CONTAR
========================================================= */

function contarSegundo() {


    if (
        tiempoRestante <= 0
    ) {

        terminar();

        return;

    }


    tiempoRestante--;


    actualizarReloj();


    revisarAlertas();


    actualizarColor();

}


/* =========================================================
   ALERTAS
========================================================= */

function revisarAlertas() {


    /* -----------------------------------------
       15 MINUTOS
    ----------------------------------------- */

    if (
        tiempoRestante === 15 * 60 &&
        !alertasEjecutadas[15]
    ) {

        alertasEjecutadas[15] = true;

        activarAlerta(
            alerta15,
            "FALTAN 15 MINUTOS",
            "amarilla"
        );

        sonido15();

    }


    /* -----------------------------------------
       10 MINUTOS
    ----------------------------------------- */

    if (
        tiempoRestante === 10 * 60 &&
        !alertasEjecutadas[10]
    ) {

        alertasEjecutadas[10] = true;

        activarAlerta(
            alerta10,
            "FALTAN 10 MINUTOS",
            "naranja"
        );

        sonido10();

    }


    /* -----------------------------------------
       5 MINUTOS
    ----------------------------------------- */

    if (
        tiempoRestante === 5 * 60 &&
        !alertasEjecutadas[5]
    ) {

        alertasEjecutadas[5] = true;

        activarAlerta(
            alerta5,
            "FALTAN 5 MINUTOS",
            "roja"
        );

        sonido5();

    }


    /* -----------------------------------------
       1 MINUTO
    ----------------------------------------- */

    if (
        tiempoRestante === 60 &&
        !alertasEjecutadas[1]
    ) {

        alertasEjecutadas[1] = true;

        activarAlerta(
            alerta1,
            "FALTA 1 MINUTO",
            "roja"
        );

        sonido1();

    }


    /* -----------------------------------------
       FIN
    ----------------------------------------- */

    if (
        tiempoRestante === 0 &&
        !alertasEjecutadas[0]
    ) {

        alertasEjecutadas[0] = true;

        sonidoFin();

    }

}


/* =========================================================
   ACTIVAR ALERTA VISUAL
========================================================= */

function activarAlerta(
    elemento,
    texto,
    tipo
) {


    elemento.classList.add(
        "alerta-activa"
    );


    mensaje.textContent =
        "⚠ " + texto;


    document.body.classList.remove(
        "alerta-amarilla",
        "alerta-naranja",
        "alerta-roja"
    );


    document.body.classList.add(
        "alerta-" + tipo
    );

}


/* =========================================================
   COLOR DEL CRONÓMETRO
========================================================= */

function actualizarColor() {


    const minutos =
        Math.ceil(
            tiempoRestante / 60
        );


    if (minutos <= 5) {


        reloj.style.color =
            "#ff2028";


        reloj.style.textShadow =
            "0 0 5px #ff2028, 0 0 15px #ff2028, 0 0 35px rgba(255,32,40,0.8)";


    }

    else if (minutos <= 10) {


        reloj.style.color =
            "#ff7900";


        reloj.style.textShadow =
            "0 0 5px #ff7900, 0 0 15px #ff7900, 0 0 35px rgba(255,121,0,0.8)";


    }

    else if (minutos <= 15) {


        reloj.style.color =
            "#ffd400";


        reloj.style.textShadow =
            "0 0 5px #ffd400, 0 0 15px #ffd400, 0 0 35px rgba(255,212,0,0.8)";


    }

    else {


        reloj.style.color =
            "#ff2028";


        reloj.style.textShadow =
            "0 0 5px #ff2028, 0 0 15px #ff2028, 0 0 30px rgba(255,32,40,0.7)";

    }

}


/* =========================================================
   FINALIZAR
========================================================= */

function finalizar() {


    clearInterval(intervalo);


    intervalo = null;


    ejecutando = false;


    mensaje.textContent =
        "■ ATENCIÓN FINALIZADA";


    btnIniciar.disabled = true;

    btnFinalizar.disabled = true;


    document.body.classList.add(
        "alerta-roja"
    );


    sonidoFin();

}


/* =========================================================
   TERMINAR AUTOMÁTICAMENTE
========================================================= */

function terminar() {


    clearInterval(intervalo);


    intervalo = null;


    ejecutando = false;


    tiempoRestante = 0;


    actualizarReloj();


    mensaje.textContent =
        "⛔ TIEMPO DE ATENCIÓN FINALIZADO";


    btnIniciar.disabled = true;

    btnFinalizar.disabled = true;


    document.body.classList.add(
        "alerta-roja"
    );


    sonidoFin();

}


/* =========================================================
   REINICIAR
========================================================= */

function reiniciar() {


    clearInterval(intervalo);


    intervalo = null;


    ejecutando = false;


    tiempoRestante =
        DURACION_SEGUNDOS;


    alertasEjecutadas = {};


    actualizarReloj();


    mensaje.textContent =
        "LISTO PARA INICIAR";


    btnIniciar.disabled = false;

    btnFinalizar.disabled = true;


    limpiarAlertasVisuales();


    reloj.style.color =
        "#ff2028";


    reloj.style.textShadow =
        "0 0 5px #ff2028, 0 0 15px #ff2028, 0 0 30px rgba(255,32,40,0.7)";

}


/* =========================================================
   LIMPIAR ALERTAS
========================================================= */

function limpiarAlertasVisuales() {


    alerta15.classList.remove(
        "alerta-activa"
    );


    alerta10.classList.remove(
        "alerta-activa"
    );


    alerta5.classList.remove(
        "alerta-activa"
    );


    alerta1.classList.remove(
        "alerta-activa"
    );


    document.body.classList.remove(
        "alerta-amarilla",
        "alerta-naranja",
        "alerta-roja"
    );

}


/* =========================================================
   CREAR TONO
========================================================= */

function tono(
    frecuencia,
    duracion,
    volumen = 0.25
) {


    prepararAudio();


    const oscillator =
        audioContext.createOscillator();


    const gain =
        audioContext.createGain();


    oscillator.connect(gain);


    gain.connect(
        audioContext.destination
    );


    oscillator.type =
        "square";


    oscillator.frequency.value =
        frecuencia;


    gain.gain.value =
        volumen;


    oscillator.start();


    gain.gain.exponentialRampToValueAtTime(

        0.001,

        audioContext.currentTime +
        duracion

    );


    oscillator.stop(

        audioContext.currentTime +
        duracion

    );

}


/* =========================================================
   SONIDO 15 MIN
========================================================= */

function sonido15() {


    tono(
        650,
        0.25
    );


    setTimeout(
        () => tono(850, 0.25),
        350
    );

}


/* =========================================================
   SONIDO 10 MIN
========================================================= */

function sonido10() {


    tono(
        750,
        0.3
    );


    setTimeout(
        () => tono(950, 0.3),
        400
    );

}


/* =========================================================
   SONIDO 5 MIN
========================================================= */

function sonido5() {


    tono(
        900,
        0.35
    );


    setTimeout(
        () => tono(1100, 0.35),
        450
    );


    setTimeout(
        () => tono(1300, 0.35),
        900
    );

}


/* =========================================================
   SONIDO 1 MIN
========================================================= */

function sonido1() {


    tono(
        1000,
        0.5
    );


    setTimeout(
        () => tono(1300, 0.5),
        600
    );


    setTimeout(
        () => tono(1600, 0.5),
        1200
    );

}


/* =========================================================
   SONIDO FINAL
========================================================= */

function sonidoFin() {


    tono(
        1300,
        0.7
    );


    setTimeout(
        () => tono(1000, 0.7),
        800
    );


    setTimeout(
        () => tono(1300, 0.7),
        1600
    );


    setTimeout(
        () => tono(800, 1),
        2400
    );

}


/* =========================================================
   PANTALLA COMPLETA
========================================================= */

btnPantalla.addEventListener(
    "click",
    function () {


        if (
            !document.fullscreenElement
        ) {


            document.documentElement
                .requestFullscreen();


        } else {


            document.exitFullscreen();

        }

    }
);


/* =========================================================
   BOTONES
========================================================= */

btnIniciar.addEventListener(
    "click",
    iniciar
);


btnFinalizar.addEventListener(
    "click",
    finalizar
);


btnReiniciar.addEventListener(
    "click",
    reiniciar
);


/* =========================================================
   INICIO
========================================================= */

actualizarReloj();
