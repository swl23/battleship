import "./style.css";
const module = require("./game.js");
const Player = module.Player;

const createPlayerDialog = document.getElementById("create-player");
const playerForm = document.getElementById("player-form");
const grids = document.querySelectorAll(".grid > *");
const ui = document.getElementById("ui-container");

// show player creation pop-up when page loads
document.addEventListener("DOMContentLoaded", () => {
    createPlayerDialog.showModal();
    ui.style.display = "grid";
});

// close pop-up and tee up gameboards once player creation is submitted
playerForm.addEventListener("submit", (Event) => {
    Event.preventDefault();
    createPlayerDialog.close();
    const name = document.getElementById("name").value;
    const size = document.getElementById("size").value;
    const players = {
        1: new Player(name, size),
        2: new Player("computer", size),
    };

    // hard coded placeholder values
    players[1].board.place("carrier", [0, 9], "vertical");
    players[1].board.place("battleship", [2, 9], "vertical");
    players[1].board.place("destroyer", [4, 9], "vertical");
    players[1].board.place("submarine", [6, 9], "vertical");
    players[1].board.place("patrol", [8, 9], "vertical");
    players[2].board.place("carrier", [1, 5], "vertical");
    players[2].board.place("battleship", [3, 5], "vertical");
    players[2].board.place("destroyer", [5, 5], "vertical");
    players[2].board.place("submarine", [7, 5], "vertical");
    players[2].board.place("patrol", [5, 9], "vertical");

    grids.forEach((grid) => {
        for (let i = size - 1; i >= 0; i--) {
            const x = document.createElement("div");
            x.setAttribute("class", `row ${i}`);

            for (let j = 0; j < size; j++) {
                const y = document.createElement("div");
                y.setAttribute("class", `column ${j}`);

                x.appendChild(y);
            }
            grid.appendChild(x);
        }
    });
});
