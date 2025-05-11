const module = require("./game.js");

const Gameboard = module.Gameboard;

test("a ship updates its location property after being placed on board", () => {
    const board = new Gameboard();
    board.place("carrier", [0, 7], "horizontal");
    expect(board.carrier.getLocation()).toEqual([
        [0, 7],
        [1, 7],
        [2, 7],
        [3, 7],
        [4, 7],
    ]);
    board.place("patrol", [3, 1], "vertical");
    expect(board.patrol.getLocation()).toEqual([
        [3, 1],
        [3, 0],
    ]);
    board.place("submarine", [7, 2], "horizontal");
    expect(board.submarine.getLocation()).toEqual([
        [7, 2],
        [8, 2],
        [9, 2],
    ]);
});
