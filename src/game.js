class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.location = null;
        this.direction = null;
    }

    hit() {
        this.hits += 1;
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
            this.attacksReceived = [];
        }
    }

    place(shipName, headCell, direction) {
        const ship = this[shipName];
        // check that destination coordinates are valid
        const destinationCoordinates = this.checkIfCoordinatesAreValid(
            ship.length,
            headCell,
            direction
        );
        if (!destinationCoordinates) {
            throw new Error("Error: coordinates are not valid.");
        } else {
            const shipLocations = this.getShipCells();
            // if there are no ships placed yet, place this ship
            if (shipLocations.length === 0) {
                ship.location = destinationCoordinates;
            } else {
                // check for collisions with existing ships
                const collisions = this.checkForCollisions(
                    destinationCoordinates,
                    shipLocations
                );
                if (collisions) {
                    throw new Error("Error: there's already a ship there.");
                } else {
                    // check to ensure 1-cell border around placed ships
                    const touchesAnotherShip = this.checkShipProximities(
                        destinationCoordinates,
                        shipLocations
                    );
                    if (touchesAnotherShip) {
                        throw new Error(
                            "Error: ships must be separated by at least 1 cell."
                        );
                    } else {
                        ship.location = destinationCoordinates;
                    }
                }
            }
        }
    }

    getShips() {
        return [
            this.carrier,
            this.battleship,
            this.destroyer,
            this.submarine,
            this.patrol,
        ];
    }

    getShipCells() {
        const placedShips = this.getShips().filter(
            (ship) => ship.getLocation() !== null
        );
        const cellsOfPlacedShips = [];
        placedShips.forEach((ship) => {
            ship.location.forEach((cell) => cellsOfPlacedShips.push(cell));
        });
        return cellsOfPlacedShips;
    }

    checkIfCoordinatesAreValid(length, headCell, direction) {
        const x = headCell[0];
        const y = headCell[1];
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

    checkForCollisions(destinationCoordinates, shipLocations) {
        for (let i = 0; i < destinationCoordinates.length; i++) {
            if (
                checkIfCoordinatesAreInArray(
                    [
                        destinationCoordinates[i][0],
                        destinationCoordinates[i][1],
                    ],
                    shipLocations
                )
            ) {
                return true;
            }
        }
        return false;
    }

    checkShipProximities(destinationCoordinates, shipLocations) {
        // make sure there's a 1-cell border around destination coords
        const cellsAroundDestination = [];
        destinationCoordinates.forEach((cell) => {
            let x = cell[0];
            let y = cell[1];
            cellsAroundDestination.push(
                [x + 1, y],
                [x + 1, y + 1],
                [x, y + 1],
                [x - 1, y + 1],
                [x - 1, y],
                [x - 1, y - 1],
                [x, y - 1],
                [x + 1, y - 1]
            );
        });
        for (let i = 0; i < cellsAroundDestination.length; i++) {
            if (
                checkIfCoordinatesAreInArray(
                    [
                        cellsAroundDestination[i][0],
                        cellsAroundDestination[i][1],
                    ],
                    shipLocations
                )
            ) {
                return true;
            }
        }
        return false;
    }

    receiveAttack(coordinates) {
        if (
            this.attacksReceived.length === 0 ||
            !checkIfCoordinatesAreInArray(coordinates, this.attacksReceived)
        ) {
            const ships = this.getShips();
            for (let i = 0; i < ships.length; i++) {
                if (
                    checkIfCoordinatesAreInArray(coordinates, ships[i].location)
                ) {
                    ships[i].hit();
                }
            }
            this.attacksReceived.push(coordinates);
            return;
        } else {
            throw new Error("Error: that cell has already been attacked.");
        }
    }

    allShipsSunk() {
        const ships = this.getShips();
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                return false;
            }
        }
        return true;
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

function checkIfCoordinatesAreInArray(coordinates, arrayOfCoordinates) {
    const x = coordinates[0];
    const y = coordinates[1];
    for (let i = 0; i < arrayOfCoordinates.length; i++) {
        if (arrayOfCoordinates[i][0] === x && arrayOfCoordinates[i][1] === y) {
            return true;
        }
    }
    return false;
}
