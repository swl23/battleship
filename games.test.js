const module = require("./game.js");

const Ship = module.Ship;
const Gameboard = module.Gameboard;
const Player = module.Player;

test("gameboard can properly place a ship across appropriate number of coordinates", () => {
    const player1 = new Player("Steven");
    player1.board.place("carrier", ["B", 2], "horizontal");
    expect(player1.board.report()).toBe({
        carrier: [["B, 2"], ["B, 3"], ["B, 4"], ["B, 5"], ["B, 6"]],
    });
});
