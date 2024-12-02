const tablero = document.getElementById("tablero");
const pala1 = document.getElementById("pala1");
const pala2 = document.getElementById("pala2");
const pelota = document.getElementById("pelota");
const puntaje1 = document.getElementById("puntaje1");
const puntaje2 = document.getElementById("puntaje2");

let pala1Y = 160;
let pala2Y = 160;
let pelotaX = 392;
let pelotaY = 192;
let pelotaVelX = 4;
let pelotaVelY = 3;
let puntajeJugador1 = 0;
let puntajeJugador2 = 0;

function moverPala(pala, delta) {
    const nuevaPos = Math.min(
        Math.max(pala === 1 ? pala1Y + delta : pala2Y + delta, 0),
        320
    );
    if (pala === 1) {
        pala1Y = nuevaPos;
        pala1.style.bottom = `${pala1Y}px`;
    } else {
        pala2Y = nuevaPos;
        pala2.style.bottom = `${pala2Y}px`;
    }
}

// Controles
document.addEventListener("keydown", (event) => {
    const velocidadMovimiento = 30; // Incrementa la velocidad
    switch (event.key.toLowerCase()) {
        case "w":
            moverPala(1, velocidadMovimiento);
            break;
        case "e":
            moverPala(1, -velocidadMovimiento);
            break;
        case "arrowup":
            moverPala(2, velocidadMovimiento);
            break;
        case "arrowdown":
            moverPala(2, -velocidadMovimiento);
            break;
    }
});


function moverPelota() {
    pelotaX += pelotaVelX;
    pelotaY += pelotaVelY;

    // Colisión con el borde superior e inferior
    if (pelotaY <= 0 || pelotaY >= 385) pelotaVelY *= -1;

    // Colisión con la pala izquierda
    if (
        pelotaX <= 25 &&
        pelotaY >= pala1Y &&
        pelotaY <= pala1Y + 80
    ) {
        pelotaVelX *= -1;
        pelotaX = 25;
    }

    // Colisión con la pala derecha
    if (
        pelotaX >= 760 &&
        pelotaY >= pala2Y &&
        pelotaY <= pala2Y + 80
    ) {
        pelotaVelX *= -1;
        pelotaX = 760;
    }

    // Gol de jugador 2
    if (pelotaX <= 0) {
        puntajeJugador2++;
        reiniciarPelota();
    }

    // Gol de jugador 1
    if (pelotaX >= 800) {
        puntajeJugador1++;
        reiniciarPelota();
    }

    pelota.style.left = `${pelotaX}px`;
    pelota.style.bottom = `${pelotaY}px`;
    actualizarPuntuacion();
}

function reiniciarPelota() {
    pelotaX = 392;
    pelotaY = 192;
    pelotaVelX *= -1;
    pelotaVelY = Math.random() > 0.5 ? 3 : -3;
}

function actualizarPuntuacion() {
    puntaje1.textContent = puntajeJugador1;
    puntaje2.textContent = puntajeJugador2;
}

// Controles
document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case "w":
            moverPala(1, 10);
            break;
        case "e":
            moverPala(1, -10);
            break;
        case "arrowup":
            moverPala(2, 10);
            break;
        case "arrowdown":
            moverPala(2, -10);
            break;
    }
});

// Bucle principal
setInterval(moverPelota, 20);
