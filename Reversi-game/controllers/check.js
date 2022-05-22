/* 
    Using: views & controllers
        
    view:
        - initial HTML (squares with black borders 8x8)
    controllers:
        - click on a cell (if valid cell, flip all surrounded discs to be 
            current turn color, change whose turn it is)
        - 2 dimensional list ( a grid - contains information about what is
            found at every cell of the game board)
*/

// set variabel
let boardBackground;
let gap = 3;
let BOARD_LENGTH = 8;
let cellWidth = 65;

// init boards
let boards = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];

// event handler 
window.onload = function () {
    boardBackground = document.getElementById('boardBackground');
    // boardBackground.style.width = cellWidth * 8 + (gap * 9);
    // boardBackground.style.height = cellWidth * 8 + (gap * 9)
    drawBoardSquares()
}

// Draw Board
function drawBoardSquares() {
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            // make a new element div for squares board
            let boardSquares = document.createElement('div');
            boardSquares.style.position = "absolute"
            boardSquares.style.width = cellWidth+'px';
            boardSquares.style.height = cellWidth+'px';
            boardSquares.style.backgroundColor = "grey";
            boardSquares.style.cursor = "pointer"
            boardSquares.style.left = (cellWidth + gap) * column + gap+'px'; // position column
            boardSquares.style.top = (cellWidth + gap) * row + gap+'px'; // position row
            boardBackground.appendChild(boardSquares);
        }
    }
}