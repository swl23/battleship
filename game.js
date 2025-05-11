class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = this.isSunk();
        this.location = null;
    }

    hit() {
        this.hit += 1;
    }

    isSunk() {
        return this.length - this.hits === 0;
    }

    getLocation() {
        return this.location;
    }
}

class Gameboard {
    constructor() {
        {
            this.carrier = new Ship(5);
            this.battleship = new Ship(4);
            this.destroyer = new Ship(3);
            this.submarine = new Ship(3);
            this.patrol = new Ship(2);
        }
    }

    place(shipName, coordinates, direction) {
        const ship = this[shipName];
        const valid = confirmValidPlacement(
            ship.length,
            coordinates,
            direction
        );
        if (valid) {
            ship.location = valid;
        } else {
            throw new Error("Not a valid ship placement!");
        }
    }
}

function confirmValidPlacement(length, coordinates, direction) {
    const x = coordinates[0];
    const y = coordinates[1];
    const location = [];
    if (direction === "vertical") {
        if (0 <= x <= 9 && y <= 9 && y - length + 1 >= 0) {
            for (let i = 0; i < length; i++) {
                location.push([x, y - i]);
            }
        } else {
            return false;
        }
    } else if (direction === "horizontal") {
        if (0 <= y <= 9 && x >= 0 && x + length - 1 <= 9) {
            for (let i = 0; i < length; i++) {
                location.push([x + i, y]);
            }
        } else {
            return false;
        }
    }
    return location;
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
