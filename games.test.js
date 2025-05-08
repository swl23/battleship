const module = require("./game.js");

const Ship = module.Ship;
const Gameboard = module.Gameboard;

test("Gameboard initiates with correct grid size and cell names", () => {
    expect(new Gameboard().board[0]).toEqual(["A", 1]);
    expect(new Gameboard().board.length).toBe(100);
});
