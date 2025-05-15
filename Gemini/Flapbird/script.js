const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const marioImage = new Image();
marioImage.src = 'path/to/mario.png'; // Replace with the actual path to the Mario image

const gravity = 0.5;
let mario = {
    x: 50,
    y: canvas.height / 2,
    width: 40,
    height: 40,
    velocityY: 0,
    jump: function() {
        this.velocityY = -10;
    },
    update: function() {
        this.velocityY += gravity;
        this.y += this.velocityY;

        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocityY = 0;
        }
    },
    draw: function() {
        ctx.drawImage(marioImage, this.x, this.y, this.width, this.height);
    }
};

let obstacles = [];
let score = 0;
let gameOver = false;

function createObstacle() {
    const obstacleHeight = Math.random() * (canvas.height - 20) + 20;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - obstacleHeight,
        width: 20,
        height: obstacleHeight
    });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 3;

        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++;
        }

        if (mario.x < obstacles[i].x + obstacles[i].width &&
            mario.x + mario.width > obstacles[i].x &&
            mario.y < obstacles[i].y &&
            mario.y + mario.height > obstacles[i].y - obstacles[i].height) {
            gameOver = true;
        }
    }
}

function drawObstacles() {
    ctx.fillStyle = 'green';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y - obstacle.height, obstacle.width, obstacle.height);
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mario.update();
    mario.draw();
    drawObstacles();
    updateObstacles();

    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        mario.jump();
    }
});

setInterval(createObstacle, 2000);
marioImage.onload = function() {
    gameLoop();
};