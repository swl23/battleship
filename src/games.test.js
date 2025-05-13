const module = require("./src/game.js");

const Gameboard = module.Gameboard;

describe("Ship Placement Operations", () => {
    test("a ship updates its location property when placed in open/valid grid coordinates", () => {
        const board = new Gameboard();
        board.place("carrier", [0, 7], "horizontal");
        expect(board.carrier.getLocation()).toEqual([
            [0, 7],
            [1, 7],
            [2, 7],
            [3, 7],
            [4, 7],
        ]);
    });

    test("a ship cannot be placed in coordinates that run off the board", () => {
        const board = new Gameboard();
        expect(() => board.place("battleship", [9, 5], "horizontal")).toThrow(
            "Error: coordinates are not valid."
        );
    });

    test("a ship cannot be placed on a cell where another ship already exists", () => {
        const board = new Gameboard();
        board.place("destroyer", [0, 0], "horizontal");
        expect(() => board.place("patrol", [2, 0], "horizontal")).toThrow(
            "Error: there's already a ship there."
        );
    });

    test("a ship cannot be placed directly next to another ship", () => {
        const board = new Gameboard();
        board.place("destroyer", [0, 0], "horizontal");
        expect(() => board.place("patrol", [3, 1], "vertical")).toThrow(
            "Error: ships must be separated by at least 1 cell."
        );
    });
});

describe("Attack Handling Operations", () => {
    test("the same cell cannot be attacked twice", () => {
        const board = new Gameboard();
        board.place("carrier", [0, 9], "vertical");
        board.place("battleship", [4, 5], "horizontal");
        board.place("destroyer", [4, 8], "horizontal");
        board.place("submarine", [1, 3], "horizontal");
        board.place("patrol", [9, 9], "vertical");
        board.receiveAttack([3, 2]);
        expect(() => board.receiveAttack([3, 2])).toThrow(
            "Error: that cell has already been attacked."
        );
    });

    test("a ship's hit counter increments when it is on a cell that receives an attack", () => {
        const board = new Gameboard();
        board.place("carrier", [0, 9], "vertical");
        board.place("battleship", [4, 5], "horizontal");
        board.place("destroyer", [4, 8], "horizontal");
        board.place("submarine", [1, 3], "horizontal");
        board.place("patrol", [9, 9], "vertical");
        board.receiveAttack([5, 5]);
        board.receiveAttack([0, 6]);
        expect(board.carrier.hits).toBe(1);
        expect(board.battleship.hits).toBe(1);
        board.receiveAttack([6, 5]);
        expect(board.battleship.hits).toBe(2);
    });

    test("a ship is marked as sunk once all its cells have been hit", () => {
        const board = new Gameboard();
        board.place("carrier", [0, 9], "vertical");
        board.place("battleship", [4, 5], "horizontal");
        board.place("destroyer", [4, 8], "horizontal");
        board.place("submarine", [1, 3], "horizontal");
        board.place("patrol", [9, 9], "vertical");
        board.receiveAttack([9, 9]);
        expect(board.patrol.isSunk()).toBeFalsy;
        board.receiveAttack([9, 8]);
        expect(board.patrol.isSunk()).toBeTruthy;
    });
});

test("the board accurately reports whether or not all ships have sunk", () => {
    const board = new Gameboard();
    board.place("carrier", [0, 9], "vertical");
    board.place("battleship", [2, 9], "vertical");
    board.place("destroyer", [4, 9], "vertical");
    board.place("submarine", [6, 9], "vertical");
    board.place("patrol", [8, 9], "vertical");
    expect(board.allShipsSunk()).toBe(false);
    board.getShipCells().forEach((cell) => {
        board.receiveAttack(cell);
    });
    expect(board.allShipsSunk()).toBe(true);
});
