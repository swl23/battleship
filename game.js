class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hit += 1;
    }

    isSunk() {
        return this.length - this.hits === 0;
    }
}

class Gameboard {
    constructor() {
        this.board = [];
        const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                this.board.push([rows[i], j + 1]);
            }
        }
    }
}

class Player {
    constructor() {
        this.board = new Gameboard();
    }
}

module.exports = {
    Ship,
    Gameboard,
    Player,
};
