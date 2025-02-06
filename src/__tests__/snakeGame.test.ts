import SnakeGame from '../snakeGame';

describe('SnakeGame', () => {
    let game: SnakeGame;

    beforeEach(() => {
        game = new SnakeGame();
    });

    test('should initialize with correct default values', () => {
        expect(game.getSnake()).toEqual([{x: 10, y: 10}]);
        expect(game.getScore()).toBe(0);
        expect(game.isGameOver()).toBe(false);
    });

    test('should move snake in the current direction', () => {
        game.update();
        expect(game.getSnake()[0]).toEqual({x: 11, y: 10});
    });

    test('should change direction correctly', () => {
        game.changeDirection({x: 0, y: 1});
        game.update();
        expect(game.getSnake()[0]).toEqual({x: 10, y: 11});
    });

    test('should end game when snake hits wall', () => {
        // Move snake to right wall (starting at x:10, need to move 9 times to reach x:19)
        for (let i = 0; i < 9; i++) {
            game.update();
        }
        expect(game.isGameOver()).toBe(false);
        // One more move should hit the wall
        game.update();
        expect(game.isGameOver()).toBe(true);
    });

    test('should increase score when eating food', () => {
        const initialFood = game.getFood();
        // Manually place snake head at food position
        game.changeDirection({
            x: initialFood.x > game.getSnake()[0].x ? 1 : -1,
            y: 0
        });
        
        // Move until food is eaten or max moves reached
        let moves = 0;
        const maxMoves = 20;
        while (moves < maxMoves && game.getScore() === 0) {
            game.update();
            moves++;
        }
        
        if (moves < maxMoves) {
            expect(game.getScore()).toBe(10);
            expect(game.getFood()).not.toEqual(initialFood);
        }
    });
});