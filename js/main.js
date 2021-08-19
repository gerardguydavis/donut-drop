const grid = document.querySelector('.grid');
const width = 8;
const squares = [];

const sweetsColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

// Create Grid
function createGrid() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.setAttribute('draggable', true);
        square.setAttribute('id', i);
        let randomColor = Math.floor(Math.random() * sweetsColors.length);
        square.style.backgroundColor = sweetsColors[randomColor];
        grid.appendChild(square);
        squares.push(square);
    }
}

createGrid();

// Drag me, Monique
let colorDragged;
let colorSwapped;
let squareIdDragged;
let squareIdSwapped;

squares.forEach(square => square.addEventListener('dragstart', dragStart));
squares.forEach(square => square.addEventListener('dragend', dragEnd));
squares.forEach(square => square.addEventListener('dragover', dragOver));
squares.forEach(square => square.addEventListener('dragenter', dragEnter));
squares.forEach(square => square.addEventListener('dragleave', dragLeave));
squares.forEach(square => square.addEventListener('drop', dragDrop));

function dragStart() {
    colorDragged = this.style.backgroundColor;
    squareIdDragged = parseInt(this.id);
}

function dragEnd() {
    let validMoves = [
        squareIdDragged - 1,
        squareIdDragged - width,
        squareIdDragged + 1,
        squareIdDragged + width
    ]
    let validMove = validMoves.includes(squareIdSwapped);

    if (squareIdSwapped && validMove) {
        squareIdSwapped = null
    } else if (squareIdSwapped && !validMove) {
        squares[squareIdSwapped].style.backgroundColor = colorSwapped;
        squares[squareIdDragged].style.backgroundColor = colorDragged;
    } else squares[squareIdDragged].style.backgroundColor = colorDragged;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    colorSwapped = this.style.backgroundColor;
    squareIdSwapped = parseInt(this.id);
    this.style.backgroundColor = colorDragged;
    squares[squareIdDragged].style.backgroundColor = colorSwapped;
}