import "./style.css";
const module = require("./game.js");
const Player = module.Player;

const createPlayerDialog = document.getElementById("create-player");
const playerForm = document.getElementById("player-form");

playerForm.addEventListener("submit", () => {
    Event.preventDefault();
    const name = document.getElementById("name").value;
    const player1 = new Player(name);
    console.log(player1);
});
