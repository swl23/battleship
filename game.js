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

module.exports = {
    Ship,
    Gameboard,
};
