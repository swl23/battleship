import { checkIfCoordinatesAreInArray } from "./game";

export { currentPlayer };

class currentPlayer {
    constructor(players) {
        this.active = players[1];
        this.inactive = players[2];
    }

    switch() {
        let oldActive = this.active;
        let oldInactive = this.inactive;
        this.active = oldInactive;
        this.inactive = oldActive;
    }

    getActive() {
        return this.active;
    }

    getInactive() {
        return this.inactive;
    }
}

/*
create player

show grid and enable ship placement

once ships are placed, if player2 is computer, provide player interface (otherwise show grid and enable ship placement for p2)
set activePlayer to p1

while no one has won {
	playRound(actiuePlayer)
		attack enemy grid
		receive feedback on attack
	switch activePlayer
}
*/
