class SnakeGame {
    constructor() {
        this.snake = [{x: 10, y: 10}];
        this.direction = {x: 1, y: 0};
        this.food = this.generateFood();
        this.score = 0;
        this.gameOver = false;
    }
    
    generateFood() {
        return {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    }
    
    update() {
        if (this.gameOver) return;
        
        // Move snake
        const head = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };
        this.snake.unshift(head);
        
        // Check collision with food
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
        
        // Check collision with walls or self
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || this.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver = true;
        }
    }
    
    changeDirection(newDirection) {
        this.direction = newDirection;
    }
}
module.exports = SnakeGame;
