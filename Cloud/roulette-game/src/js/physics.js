function calculateFriction(velocity, frictionCoefficient) {
    return velocity * frictionCoefficient;
}

function updatePosition(position, velocity, deltaTime) {
    return position + (velocity * deltaTime);
}

function simulateBallMovement(ball) {
    const gravity = 9.81; // Acceleration due to gravity in m/s²
    const deltaTime = 0.016; // Assuming 60 FPS, so ~16ms per frame

    // Update ball velocity based on gravity
    ball.velocity.y += gravity * deltaTime;

    // Update ball position
    ball.position.y = updatePosition(ball.position.y, ball.velocity.y, deltaTime);

    // Apply friction to slow down the ball
    ball.velocity.y -= calculateFriction(ball.velocity.y, 0.1) * deltaTime;

    // Check if the ball has hit the bottom of the wheel
    if (ball.position.y >= wheelBottom) {
        ball.position.y = wheelBottom;
        ball.velocity.y = 0; // Stop the ball
    }
}

function simulateWheelRotation(wheel) {
    const rotationSpeed = 5; // Degrees per second
    wheel.angle += rotationSpeed * (Math.PI / 180); // Convert to radians
    if (wheel.angle >= 2 * Math.PI) {
        wheel.angle -= 2 * Math.PI; // Keep angle within 0 to 2π
    }
}