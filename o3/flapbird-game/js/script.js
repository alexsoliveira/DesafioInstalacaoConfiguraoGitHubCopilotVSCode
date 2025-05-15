const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const marioImage = new Image();
marioImage.src = 'assets/mario.png';

const gravity = 0.5;
const flapStrength = 10;
let marioY = canvas.height / 2;
let marioVelocity = 0;
let isGameOver = false;

function drawMario() {
    ctx.drawImage(marioImage, 50, marioY, 50, 50);
}

function update() {
    if (!isGameOver) {
        marioVelocity += gravity;
        marioY += marioVelocity;

        if (marioY + 50 >= canvas.height) {
            isGameOver = true;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMario();
    } else {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
    }
}

function flap() {
    if (!isGameOver) {
        marioVelocity = -flapStrength;
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        flap();
    }
});

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

marioImage.onload = () => {
    gameLoop();
};