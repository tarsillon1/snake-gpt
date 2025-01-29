class SnakeGame {
    constructor() {
        this.snake = [{x: 10, y: 10}];
        this.direction = {x: 1, y: 0};
        this.food = this.randomFoodPosition();
        this.score = 0;
        this.gameOver = false;
    }
    
    randomFoodPosition() {
        return {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    }
    
    update() {
        if (this.gameOver) return;
        this.moveSnake();
        this.checkCollision();
        this.checkFoodConsumption();
    }
    
    moveSnake() {
        const newHead = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };
        this.snake.unshift(newHead);
        this.snake.pop();
    }
    
    checkCollision() {
        const head = this.snake[0];
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
            this.gameOver = true;
        }
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver = true;
            }
        }
    }
    
    checkFoodConsumption() {
        const head = this.snake[0];
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.snake.push({...this.snake[this.snake.length - 1]});
            this.food = this.randomFoodPosition();
        }
    }
}
class SnakeGame {
    constructor() {
        this.snake = [{x: 10, y: 10}];
        this.direction = {x: 1, y: 0};
        this.food = this.generateFood();
        this.score = 0;
        this.gridSize = 20;
    }
    
    generateFood() {
        return {
            x: Math.floor(Math.random() * this.gridSize),
            y: Math.floor(Math.random() * this.gridSize)
        };
    }
    
    update() {
        const head = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };
        this.snake.unshift(head);
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 1;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
        if (this.checkCollision(head)) {
            this.resetGame();
        }
    }
    
    checkCollision(head) {
        return head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize || this.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }
    
    resetGame() {
        this.snake = [{x: 10, y: 10}];
        this.direction = {x: 1, y: 0};
        this.food = this.generateFood();
        this.score = 0;
    }
}
module.exports = SnakeGame;
class SnakeGame {
    constructor() {
        this.snake = [{x: 10, y: 10}];
        this.direction = {x: 1, y: 0};
        this.food = this.generateFood();
        this.score = 0;
        this.gameOver = false;
    }
    
    generateFood() {
        console.log("foo");
        return {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    }
    
    update() {
        if (this.gameOver) return;
        
        const newHead = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };
        
        if (this.checkCollision(newHead)) {
            this.gameOver = true;
            return;
        }
        
        this.snake.unshift(newHead);
        
        if (newHead.x === this.food.x && newHead.y === this.food.y) {
            this.score += 10;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
    }
    
    checkCollision(position) {
        return position.x < 0 || position.x >= 20 || position.y < 0 || position.y >= 20 ||
               this.snake.some(segment => segment.x === position.x && segment.y === position.y);
    }
    
    changeDirection(newDirection) {
        if ((newDirection.x !== 0 || this.direction.x !== 0) &&
            (newDirection.y !== 0 || this.direction.y !== 0)) {
            this.direction = newDirection;
        }
    }
}
module.exports = SnakeGame;

// Initialize game variables
let snake = [{x: 10, y: 10}];
let direction = {x: 0, y: 0};
let food = {x: 15, y: 15};
let score = 0;
const gridSize = 20;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Function to update the game state
function update() {
    // Move snake
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        placeFood();
    } else {
        snake.pop();
    }
    // Check for collision with walls or self
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
    }
}

// Function to draw the game state
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20));
    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
    // Draw score
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, canvas.height - 10);
}

// Function to place food at a random position
function placeFood() {
    food = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    };
}

// Function to reset the game
function resetGame() {
    snake = [{x: 10, y: 10}];
    direction = {x: 0, y: 0};
    score = 0;
    placeFood();
}

// Event listener for key presses
document.addEventListener('keydown', event => {
    switch(event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = {x: 1, y: 0};
            break;
    }
});

// Game loop
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}
gameLoop();