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
    constructor() {}
}

class Player {
    constructor() {
        this.board = new Gameboard();
    }
}

module.exports = {
    Ship,
    Gameboard,
};
