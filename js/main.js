const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const width = 8;
const squares = [];
let score = 0;

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
    const rowEnds = [7, 15, 23, 31, 39, 47, 55]
    const rowStarts = [8, 16, 24, 32, 40, 48, 56]

    if (rowStarts.includes(squareIdDragged) && rowEnds.includes(squareIdSwapped)) {
        squares[squareIdSwapped].style.backgroundColor = colorSwapped;
        squares[squareIdDragged].style.backgroundColor = colorDragged;
    } else if (rowEnds.includes(squareIdDragged) && rowStarts.includes(squareIdSwapped)) {
        squares[squareIdSwapped].style.backgroundColor = colorSwapped;
        squares[squareIdDragged].style.backgroundColor = colorDragged;
    } else if (squareIdSwapped && validMove) {
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

//Drop New Sweets
function moveDown() {
    for (i = 0; i < 56; i++) {
        if (squares[i + width].style.backgroundColor === '') {
            squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
            squares[i].style.backgroundColor = ''
        }
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)
        if (isFirstRow && squares[i].style.backgroundColor === '') {
            let randomColor = Math.floor(Math.random() * sweetsColors.length)
            squares[i].style.backgroundColor = sweetsColors[randomColor];
        }
    }
}

//Check matches

//Check for row of three
function checkRowForThree() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if (notValid.includes(i)) continue;

        if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 300;
            scoreDisplay.innerHTML = score;
            rowOfThree.forEach(index => {
                squares[index].style.backgroundColor = '';
            })
        }
    }
}

//Check for column of three
function checkColumnForThree() {
    for (i = 0; i < 48; i++) {
        let columnOfThree = [i, i + width, i + width * 2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 300;
            scoreDisplay.innerHTML = score;
            columnOfThree.forEach(index => {
                squares[index].style.backgroundColor = '';
            })
        }
    }
}

//Check for row of four
function checkRowForFour() {
    for (i = 0; i < 60; i++) {
        let rowOfFour = [i, i + 1, i + 2, i + 3];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
        if (notValid.includes(i)) continue;

        if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 500;
            scoreDisplay.innerHTML = score;
            rowOfFour.forEach(index => {
                squares[index].style.backgroundColor = '';
            })
        }
    }
}

//Check for column of four
function checkColumnForFour() {
    for (i = 0; i < 40; i++) {
        let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 500;
            scoreDisplay.innerHTML = score;
            columnOfFour.forEach(index => {
                squares[index].style.backgroundColor = '';
            })
        }
    }
}

//Check for row of five
function checkRowForFive() {
    for (i = 0; i < 59; i++) {
        let rowOfFive = [i, i + 1, i + 2, i + 3];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
        if (notValid.includes(i)) continue;

        if (rowOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 1000;
            scoreDisplay.innerHTML = score;
            rowOfFive.forEach(index => {
                squares[index].style.backgroundColor = '';
            })
        }
    }
}

//Check for column of five
function checkColumnForFive() {
    for (i = 0; i < 31; i++) {
        let columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        if (columnOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 1000;
            scoreDisplay.innerHTML = score;
            columnOfFive.forEach(index => {
                squares[index].style.backgroundColor = '';
            })
        }
    }
}

function fadeout() {
    for (i = 0; i < 63; i++) {
        if (squares[i].style.backgroundColor === '') {
            squares[i].classList.add("fadeout");
        } else if (squares[i].classList.contains("fadeout")) {
            if (squares[i].style.backgroundColor !== '') {
                squares[i].classList.remove("fadeout")
            }
        }
    }
}

window.setInterval(function () {
    moveDown(),
        checkRowForFive(),
        checkColumnForFive(),
        checkRowForFour(),
        checkColumnForFour(),
        checkRowForThree(),
        checkColumnForThree()
}
    , 100);