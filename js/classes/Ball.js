export default class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = 2;
        this.speedY = 2;
    }

    // Méthode pour dessiner la balle
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    // Méthode pour déplacer la balle
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    // Rebondir contre les murs
    bounceWalls(canvas) {
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.speedY = -this.speedY;
        }
    }

    // Rebondir sur les joueurs
    bouncePlayer(player) {
        if (this.x - this.radius < player.x + player.width && this.x + this.radius > player.x) {
            if (this.y > player.y && this.y < player.y + player.height) {
                this.speedX = -this.speedX;
            }
        }
    }

    // Réinitialiser la position de la balle
    resetPosition() {
        this.x = 320;
        this.y = 240;
        this.speedX = -this.speedX;
    }
}
