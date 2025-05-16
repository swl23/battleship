export { createBoards };

function createBoards(gridElement, size) {
    for (let i = size - 1; i >= 0; i--) {
        const x = document.createElement("div");
        x.classList.add(i);
        x.classList.add("row");
        for (let j = 0; j < size; j++) {
            const y = document.createElement("div");
            y.classList.add(j);
            y.classList.add("cell");
            y.addEventListener("click", (Event) => {
                getCoordinatesFromSquare(y, Event);
            });
            x.appendChild(y);
        }
        gridElement.appendChild(x);
    }
}

function getCoordinatesFromSquare(square, Event) {
    const x = square.classList[0];
    const y = Event.target.parentNode.classList[0];
    console.log([Number(x), Number(y)]);
}
