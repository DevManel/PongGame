import Ball from './classes/Ball.js';
import Player from './classes/Player.js';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Création des instances de la balle et des joueurs
const ball = new Ball(320, 240, 10, 'red');
const player1 = new Player(10, 240, 5, 80, 'blue');
const player2 = new Player(630, 240, 5, 80, 'blue');

// Variables pour la gestion du score
let scorePlayer1 = 0;
let scorePlayer2 = 0;
const maxScore = 5; // Limite de score

// Fonction de mise à jour du jeu
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les éléments du jeu
    ball.draw(context);
    player1.draw(context);
    player2.draw(context);

    // Déplacer la balle
    ball.move();

    // Gérer les rebonds sur les bords du canvas
    ball.bounceWalls(canvas);

    // Rebond sur les joueurs
    ball.bouncePlayer(player1);
    ball.bouncePlayer(player2);

    // Vérifier si un joueur marque un point
    if (ball.x < 0) {
        scorePlayer2++;
        ball.resetPosition();
    } else if (ball.x > canvas.width) {
        scorePlayer1++;
        ball.resetPosition();
    }

    // Vérifier si un joueur a atteint la limite de score
    if (scorePlayer1 >= maxScore) {
        context.fillStyle = 'white';
        context.font = '24px Arial';
        context.fillText(`Player 1 wins!`, 250, 160);
        return;  // Arrêter la mise à jour du jeu
    } else if (scorePlayer2 >= maxScore) {
        context.fillStyle = 'white';
        context.font = '24px Arial';
        context.fillText(`Player 2 wins!`, 250, 160);
        return;  // Arrêter la mise à jour du jeu
    }

    // Mettre à jour le score
    context.fillStyle = 'white';
    context.font = '24px Arial';
    context.fillText(`Score: ${scorePlayer1} - ${scorePlayer2}`, 250, 30);

    requestAnimationFrame(update);
}

// Gérer le déplacement des joueurs avec la souris
canvas.addEventListener('mousemove', (event) => {
    player1.y = event.clientY - canvas.offsetTop - player1.height / 2;
    player2.y = event.clientY - canvas.offsetTop - player2.height / 2;
});

// Lancer la mise à jour du jeu
update();
