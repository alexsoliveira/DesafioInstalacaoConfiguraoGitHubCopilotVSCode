const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');

const wheelRadius = 200;
const ballRadius = 10;
let angle = 0;
let spinAngle = 0;
let isSpinning = false;
let ballPosition = { x: canvas.width / 2, y: canvas.height / 2 - wheelRadius - ballRadius };

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);

    for (let i = 0; i < 36; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, -wheelRadius, wheelRadius, (i * Math.PI) / 18, ((i + 1) * Math.PI) / 18);
        ctx.fillStyle = i % 2 === 0 ? 'red' : 'black';
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballPosition.x, ballPosition.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
}

function spinWheel() {
    if (isSpinning) return;

    isSpinning = true;
    spinAngle = Math.random() * 10 + 10; // Random spin speed
    const spinDuration = 3000; // Spin for 3 seconds
    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        if (elapsed < spinDuration) {
            angle += (spinAngle * (elapsed / spinDuration));
            ballPosition.y += (elapsed / spinDuration) * 2; // Simulate ball drop
            drawWheel();
            drawBall();
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            ballPosition.y = canvas.height / 2 - wheelRadius - ballRadius; // Reset ball position
            drawWheel();
            drawBall();
        }
    }

    requestAnimationFrame(animate);
}

document.getElementById('spinButton').addEventListener('click', spinWheel);
drawWheel();
drawBall();