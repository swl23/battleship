class Ship {
    constructor(length, name) {
        this.name = name;
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
    constructor(size) {
        {
            this.size = size;
            this.carrier = new Ship(5, "carrier");
            this.battleship = new Ship(4, "battleship");
            this.destroyer = new Ship(3, "destroyer");
            this.submarine = new Ship(3, "submarine");
            this.patrol = new Ship(2, "patrol");
            this.attacksReceived = {
                hits: [],
                misses: [],
            };
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

    getAttacksReceived() {
        return this.attacksReceived;
    }

    allShipsPlaced() {
        const ships = this.getShips();
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].location === null) {
                return false;
            }
        }
        return true;
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
            if (0 <= x < this.size && y < this.size && y - length + 1 >= 0) {
                for (let i = 0; i < length; i++) {
                    location.push([x, y - i]);
                }
            } else {
                return false;
            }
        } else if (direction === "horizontal") {
            if (0 <= y < this.size && x >= 0 && x + length - 1 < this.size) {
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
        // fill sure there's a 1-cell border around destination coords
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
            checkIfCoordinatesAreInArray(
                coordinates,
                this.attacksReceived.hits
            ) ||
            checkIfCoordinatesAreInArray(
                coordinates,
                this.attacksReceived.misses
            )
        ) {
            throw new Error("Error: that cell has already been attacked.");
        } else {
            const ships = this.getShips();
            for (let i = 0; i < ships.length; i++) {
                if (
                    checkIfCoordinatesAreInArray(coordinates, ships[i].location)
                ) {
                    ships[i].hit();
                    this.attacksReceived.hits.push(coordinates);
                    return ships[i];
                }
            }
            this.attacksReceived.misses.push(coordinates);
            return false;
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
    constructor(name, size = 9) {
        this.name = name;
        this.board = new Gameboard(size);
    }
}

module.exports = {
    Ship,
    Gameboard,
    Player,
    checkIfCoordinatesAreInArray,
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
