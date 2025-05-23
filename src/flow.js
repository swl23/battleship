import "./style.css";
import { currentPlayer } from "./dom.js";
const module = require("./game.js");
const Player = module.Player;
const checkIfCoordinatesAreInArray = module.checkIfCoordinatesAreInArray;

const createPlayerDialog = document.getElementById("create-player");
const playerForm = document.getElementById("player-form");
const placeShipsDialog = document.getElementById("ship-place");
const shipForm = document.getElementById("ship-form");
const placeGrid = document.getElementById("place");

// show player creation pop-up when page loads
document.addEventListener("DOMContentLoaded", () => {
    createPlayerDialog.showModal();
});

// close player create modal, open ship placement modal
playerForm.addEventListener("submit", (Event) => {
    Event.preventDefault();
    createPlayerDialog.close();
    const name = document.getElementById("name").value;
    const players = {
        1: new Player(name),
        2: new Player("computer"),
    };
    players[1].board.place("carrier", [0, 7], "vertical");
    players[1].board.place("battleship", [2, 7], "vertical");
    players[1].board.place("destroyer", [4, 7], "vertical");
    players[1].board.place("submarine", [6, 7], "vertical");
    players[1].board.place("patrol", [0, 0], "horizontal");
    players[2].board.place("carrier", [1, 5], "vertical");
    players[2].board.place("battleship", [3, 5], "vertical");
    players[2].board.place("destroyer", [5, 5], "vertical");
    players[2].board.place("submarine", [7, 5], "vertical");
    players[2].board.place("patrol", [5, 0], "horizontal");

    placeShipsDialog.showModal();
    displayShips(placeGrid, players[1]);

    shipForm.addEventListener("submit", (Event) => {
        Event.preventDefault();
        placeShipsDialog.close();
        const playerController = new currentPlayer(players);
        const playerGrid = document.getElementById("player");
        const enemyGrid = document.getElementById("enemy");

        let winner = false;
        while (!winner) {
            const player = playerController.getActive();
            const enemy = playerController.getInactive();
            displayShips(playerGrid, player);
            displayAttacks(enemyGrid, enemy);
            const squares = enemyGrid.querySelectorAll(".cell");
            squares.forEach((square) => {
                square.addEventListener("click", () => {
                    const coordinates = getCoordinatesOfSquare(square);
                    const attackResult = enemy.board.receiveAttack(coordinates);
                    displayAttacks(enemyGrid, enemy);
                    reportResult(attackResult);
                    winner = checkForVictory(player, enemy);
                    playerController.switch();
                });
            });
        }
        alert(`${outcome.winner} wins!`);
    });
});

function displayShips(myGrid, player) {
    myGrid.textContent = "";
    const size = player.board.size;
    const hits = player.board.getAttacksReceived().hits;
    const misses = player.board.getAttacksReceived().misses;
    const shipCells = player.board.getShipCells();
    for (let i = size; i >= 0; i--) {
        const row = document.createElement("div");
        row.classList.add("row", `${i}`);
        for (let j = 0; j <= size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", `${j}`);
            if (shipCells.length > 0) {
                if (checkIfCoordinatesAreInArray([j, i], shipCells)) {
                    cell.classList.add("ship");
                }
            }
            if (hits.length > 0 || misses.length > 0) {
                if (
                    checkIfCoordinatesAreInArray([j, i], hits) ||
                    checkIfCoordinatesAreInArray([j, i], misses)
                ) {
                    cell.textContent = "X";
                }
            }
            row.appendChild(cell);
        }
        myGrid.appendChild(row);
    }
}

function displayAttacks(theirGrid, enemy) {
    theirGrid.textContent = "";
    const size = enemy.board.size;
    const hits = enemy.board.getAttacksReceived().hits;
    const misses = enemy.board.getAttacksReceived().misses;
    for (let i = size; i >= 0; i--) {
        const row = document.createElement("div");
        row.classList.add("row", `${i}`);
        for (let j = 0; j <= size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", `${j}`);
            if (hits.length > 0 || misses.length > 0) {
                if (checkIfCoordinatesAreInArray([j, i], hits)) {
                    cell.classList.add("hit");
                    cell.textContent = "X";
                }
                if (checkIfCoordinatesAreInArray([j, i], misses)) {
                    cell.classList.add("miss");
                }
            }
            row.appendChild(cell);
        }
        theirGrid.appendChild(row);
    }
}

function playRound(currentPlayer, shipGrid, attackGrid) {
    const player = currentPlayer.getActive();
    const enemy = currentPlayer.getInactive();
    displayShips(shipGrid, player);
    displayAttacks(attackGrid, enemy);
    makeAttackGridFunctional(attackGrid, enemy);
}

function makeAttackGridFunctional(attackGrid, enemy) {
    const squares = attackGrid.querySelectorAll(".cell");
    squares.forEach((square) => {
        square.addEventListener("click", () => {
            const coordinates = getCoordinatesOfSquare(square);
            const attackResult = enemy.board.receiveAttack(coordinates);
            reportResult(attackResult, attackGrid, enemy);
        });
    });
}

function reportResult(attackResult) {
    if (!attackResult) {
        console.log("MISS");
    } else {
        console.log(`HIT ${attackResult.name.toUpperCase()}`);
    }
}

function checkForVictory(player, enemy) {
    if (player.board.allShipsSunk()) {
        return {
            winner: enemy,
            loser: player,
        };
    } else if (enemy.board.allShipsSunk()) {
        return {
            winner: player,
            loser: enemy,
        };
    } else {
        return false;
    }
}

function getCoordinatesOfSquare(square) {
    const x = square.classList[1];
    const y = square.parentNode.classList[1];
    return [Number(x), Number(y)];
}
