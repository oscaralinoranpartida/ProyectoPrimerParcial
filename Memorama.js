const app = document.getElementById(".card");
let cards = [
    "imagenes/1.png",
    "imagenes/2.png",
    "imagenes/3.png",
    "imagenes/4.png",
    "imagenes/5.png",
    "imagenes/6.png"
];

// Inicializamos algunas variables
let activeCard = null;
let cardsFlipped = 0;
const btn = document.getElementById('btn')
// Seleccionamos todos los elementos con la clase "card"
let cardElements = document.querySelectorAll(".card");
//Duplica y mezcla las cartas
cards = cards.concat(cards);
shuffle(cards);
// Añadimos un evento "click" a cada carta
cardElements.forEach(card => {
    card.addEventListener("click", function() {
        card.classList.add('rotate');
        // Si la carta ya está volteada o activa, no hacemos nada
        if (card.classList.contains("flipped") || card.classList.contains("active")) {
            return;
        }

        // Volteamos la carta
        card.classList.add("active");
        card.classList.add("flipped");
        card.querySelector("img").src = cards[parseInt(card.id.substring(4)) - 1];

        // Si ya hay otra carta activa, comparamos las dos
        if (activeCard) {
            let card1 = activeCard;
            let card2 = card;

            activeCard = null;

            if (card1.querySelector("img").src === card2.querySelector("img").src) {
                // Si las cartas tienen la misma imagen, las dejamos volteadas
                cardsFlipped += 2;
                card1.style.background = "plum"
                card2.style.background = "plum"
                if (cardsFlipped === cards.length) {
                    // Si todas las cartas están volteadas, el juego termina
                    setTimeout(function() {
                        alert("¡Felicidades, ganaste!");
                    }, 1200);/*Se ejecuta despues de un tiempo determinado*/
                }
            } else {
                // Si las cartas no tienen la misma imagen, las volteamos de nuevo después de un segundo se eliminan lo que ya teniamos
                setTimeout(function() {
                    card1.classList.remove('rotate');
                    card1.classList.remove("active");
                    card1.classList.remove("flipped");
                    card1.querySelector("img").src ="imagenes/palanca-de-mando.png";

                    card2.classList.remove('rotate');
                    card2.classList.remove("active");
                    card2.classList.remove("flipped");
                    card2.querySelector("img").src = "imagenes/palanca-de-mando.png";
                }, 1000);
            }
        } else {
            // Si no hay otra carta activa, esta es la primera
            activeCard = card;
        }
    });
});

// Función para mezclar un array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp; 
    }
}