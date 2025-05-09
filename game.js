class Ship {
    constructor(name) {
        this.name = name;
        const lengths = {
            carrier: 5,
            battleship: 4,
            destroyer: 3,
            submarine: 3,
            patrol: 2,
        };
        this.length = lengths[this.name];
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
    constructor(name) {
        this.name = name;
        this.board = new Gameboard();
    }
}

module.exports = {
    Ship,
    Gameboard,
    Player,
};
