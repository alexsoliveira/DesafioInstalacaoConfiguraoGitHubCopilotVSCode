function Roulette() {
    this.angle = 0;
    this.speed = 0;
    this.isSpinning = false;
    this.winningNumber = null;

    this.start = function() {
        this.isSpinning = true;
        this.speed = Math.random() * 10 + 5; // Random speed between 5 and 15
        this.rotate();
    };

    this.rotate = function() {
        if (this.isSpinning) {
            this.angle += this.speed;
            this.speed *= 0.99; // Slow down over time

            if (this.speed < 0.1) {
                this.stop();
            } else {
                requestAnimationFrame(this.rotate.bind(this));
            }
        }
    };

    this.stop = function() {
        this.isSpinning = false;
        this.winningNumber = this.calculateWinningNumber();
        this.displayWinningNumber();
    };

    this.calculateWinningNumber = function() {
        // Assuming the wheel has 37 numbers (0-36)
        return Math.floor((this.angle % 360) / 10); // Adjust based on your wheel's design
    };

    this.displayWinningNumber = function() {
        console.log("Winning Number: " + this.winningNumber);
        // You can update the UI to show the winning number here
    };
}

const roulette = new Roulette();