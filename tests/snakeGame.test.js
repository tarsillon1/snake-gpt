const SnakeGame = require('../src/snakeGame');

describe('SnakeGame', () => {
  let game;

  beforeEach(() => {
    game = new SnakeGame();
  });

  describe('Initialization', () => {
    test('should initialize with a snake at the starting position', () => {
      expect(game.snake).toEqual([{ x: 10, y: 10 }]);
    });

    test('should initialize with direction moving right', () => {
      expect(game.direction).toEqual({ x: 1, y: 0 });
    });

    test('should initialize with score of 0', () => {
      expect(game.score).toBe(0);
    });

    test('should initialize with gameOver as false', () => {
      expect(game.gameOver).toBe(false);
    });

    test('should generate initial food', () => {
      expect(game.food).toBeDefined();
      expect(game.food.x).toBeGreaterThanOrEqual(0);
      expect(game.food.x).toBeLessThan(20);
      expect(game.food.y).toBeGreaterThanOrEqual(0);
      expect(game.food.y).toBeLessThan(20);
    });
  });

  describe('Food Generation', () => {
    test('should generate food within grid boundaries', () => {
      for (let i = 0; i < 100; i++) {
        const food = game.generateFood();
        expect(food.x).toBeGreaterThanOrEqual(0);
        expect(food.x).toBeLessThan(20);
        expect(food.y).toBeGreaterThanOrEqual(0);
        expect(food.y).toBeLessThan(20);
      }
    });

    test('should generate food with integer coordinates', () => {
      const food = game.generateFood();
      expect(Number.isInteger(food.x)).toBe(true);
      expect(Number.isInteger(food.y)).toBe(true);
    });
  });

  describe('Direction Change', () => {
    test('should change direction to up', () => {
      game.changeDirection({ x: 0, y: -1 });
      expect(game.direction).toEqual({ x: 0, y: -1 });
    });

    test('should change direction to down', () => {
      game.changeDirection({ x: 0, y: 1 });
      expect(game.direction).toEqual({ x: 0, y: 1 });
    });

    test('should change direction to left', () => {
      game.changeDirection({ x: -1, y: 0 });
      expect(game.direction).toEqual({ x: -1, y: 0 });
    });

    test('should change direction to right', () => {
      game.changeDirection({ x: 1, y: 0 });
      expect(game.direction).toEqual({ x: 1, y: 0 });
    });
  });

  describe('Movement', () => {
    test('should move snake right when direction is right', () => {
      game.direction = { x: 1, y: 0 };
      game.update();
      expect(game.snake[0]).toEqual({ x: 11, y: 10 });
    });

    test('should move snake left when direction is left', () => {
      game.direction = { x: -1, y: 0 };
      game.update();
      expect(game.snake[0]).toEqual({ x: 9, y: 10 });
    });

    test('should move snake up when direction is up', () => {
      game.direction = { x: 0, y: -1 };
      game.update();
      expect(game.snake[0]).toEqual({ x: 10, y: 9 });
    });

    test('should move snake down when direction is down', () => {
      game.direction = { x: 0, y: 1 };
      game.update();
      expect(game.snake[0]).toEqual({ x: 10, y: 11 });
    });

    test('should remove tail segment when not eating food', () => {
      game.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
      game.direction = { x: 1, y: 0 };
      game.food = { x: 0, y: 0 }; // Food far away
      game.update();
      expect(game.snake.length).toBe(3);
      expect(game.snake).toEqual([
        { x: 11, y: 10 },
        { x: 10, y: 10 },
        { x: 9, y: 10 }
      ]);
    });
  });

  describe('Food Collision Detection', () => {
    test('should detect when snake head is on food', () => {
      game.snake = [{ x: 5, y: 5 }];
      game.food = { x: 6, y: 5 };
      game.direction = { x: 1, y: 0 };
      game.update();

      // Score should increase
      expect(game.score).toBe(10);
    });

    test('should not detect collision when snake is not on food', () => {
      game.snake = [{ x: 5, y: 5 }];
      game.food = { x: 10, y: 10 };
      game.direction = { x: 1, y: 0 };
      const initialScore = game.score;
      game.update();

      expect(game.score).toBe(initialScore);
    });
  });

  describe('Snake Growth', () => {
    test('should grow snake when eating food', () => {
      game.snake = [{ x: 5, y: 5 }];
      game.food = { x: 6, y: 5 };
      game.direction = { x: 1, y: 0 };
      game.update();

      expect(game.snake.length).toBe(2);
    });

    test('should generate new food after eating', () => {
      game.snake = [{ x: 5, y: 5 }];
      const oldFood = { x: 6, y: 5 };
      game.food = oldFood;
      game.direction = { x: 1, y: 0 };
      game.update();

      // New food should be generated
      expect(game.food).not.toEqual(oldFood);
    });

    test('should grow snake multiple times', () => {
      game.snake = [{ x: 5, y: 5 }];
      const initialLength = game.snake.length;

      // Eat food 3 times
      for (let i = 0; i < 3; i++) {
        game.food = { x: game.snake[0].x + 1, y: game.snake[0].y };
        game.direction = { x: 1, y: 0 };
        game.update();
      }

      expect(game.snake.length).toBe(initialLength + 3);
    });
  });

  describe('Score Tracking', () => {
    test('should increase score by 10 when eating food', () => {
      game.snake = [{ x: 5, y: 5 }];
      game.food = { x: 6, y: 5 };
      game.direction = { x: 1, y: 0 };
      const initialScore = game.score;
      game.update();

      expect(game.score).toBe(initialScore + 10);
    });

    test('should accumulate score for multiple food items', () => {
      game.snake = [{ x: 5, y: 5 }];

      // Eat food 5 times
      for (let i = 0; i < 5; i++) {
        game.food = { x: game.snake[0].x + 1, y: game.snake[0].y };
        game.direction = { x: 1, y: 0 };
        game.update();
      }

      expect(game.score).toBe(50);
    });

    test('should not increase score when not eating food', () => {
      game.snake = [{ x: 5, y: 5 }];
      game.food = { x: 15, y: 15 };
      game.direction = { x: 1, y: 0 };
      const initialScore = game.score;
      game.update();

      expect(game.score).toBe(initialScore);
    });
  });

  describe('Wall Collision Detection', () => {
    test('should detect collision with right wall', () => {
      game.snake = [{ x: 19, y: 10 }];
      game.direction = { x: 1, y: 0 };
      game.update();

      expect(game.gameOver).toBe(true);
    });

    test('should detect collision with left wall', () => {
      game.snake = [{ x: 0, y: 10 }];
      game.direction = { x: -1, y: 0 };
      game.update();

      expect(game.gameOver).toBe(true);
    });

    test('should detect collision with top wall', () => {
      game.snake = [{ x: 10, y: 0 }];
      game.direction = { x: 0, y: -1 };
      game.update();

      expect(game.gameOver).toBe(true);
    });

    test('should detect collision with bottom wall', () => {
      game.snake = [{ x: 10, y: 19 }];
      game.direction = { x: 0, y: 1 };
      game.update();

      expect(game.gameOver).toBe(true);
    });

    test('should not detect collision when not at wall', () => {
      game.snake = [{ x: 10, y: 10 }];
      game.direction = { x: 1, y: 0 };
      game.update();

      expect(game.gameOver).toBe(false);
    });
  });

  describe('Self-Collision Detection', () => {
    test('should detect collision with own body', () => {
      // Create a snake in a position where it will hit itself
      game.snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 9, y: 11 },
        { x: 10, y: 11 }
      ];
      game.direction = { x: 0, y: 1 }; // Moving down, will hit position (10, 11)
      game.update();

      expect(game.gameOver).toBe(true);
    });

    test('should not detect collision with own head', () => {
      game.snake = [{ x: 10, y: 10 }];
      game.direction = { x: 1, y: 0 };
      game.update();

      expect(game.gameOver).toBe(false);
    });

    test('should not detect collision when snake is short', () => {
      game.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }];
      game.direction = { x: 1, y: 0 };
      game.update();

      expect(game.gameOver).toBe(false);
    });
  });

  describe('Game Over Scenarios', () => {
    test('should set gameOver to true on wall collision', () => {
      game.snake = [{ x: 19, y: 10 }];
      game.direction = { x: 1, y: 0 };
      game.update();

      expect(game.gameOver).toBe(true);
    });

    test('should set gameOver to true on self-collision', () => {
      game.snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 9, y: 11 },
        { x: 10, y: 11 }
      ];
      game.direction = { x: 0, y: 1 };
      game.update();

      expect(game.gameOver).toBe(true);
    });

    test('should maintain gameOver state after collision', () => {
      game.snake = [{ x: 19, y: 10 }];
      game.direction = { x: 1, y: 0 };
      game.update();
      game.update(); // Try to update again

      expect(game.gameOver).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    test('should handle snake at corner (0,0)', () => {
      game.snake = [{ x: 0, y: 0 }];
      game.direction = { x: 1, y: 0 };
      game.update();

      expect(game.snake[0]).toEqual({ x: 1, y: 0 });
      expect(game.gameOver).toBe(false);
    });

    test('should handle snake at corner (19,19)', () => {
      game.snake = [{ x: 19, y: 19 }];
      game.direction = { x: -1, y: 0 };
      game.update();

      expect(game.snake[0]).toEqual({ x: 18, y: 19 });
      expect(game.gameOver).toBe(false);
    });

    test('should handle very long snake', () => {
      // Create a snake with 50 segments
      game.snake = [];
      for (let i = 0; i < 50; i++) {
        game.snake.push({ x: 10, y: 10 - i });
      }
      game.direction = { x: 1, y: 0 };
      game.food = { x: 0, y: 0 }; // Food far away
      game.update();

      expect(game.snake.length).toBe(50);
      expect(game.snake[0]).toEqual({ x: 11, y: 10 });
    });
  });
});
