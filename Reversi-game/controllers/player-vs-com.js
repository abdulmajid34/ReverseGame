// set variabel
let BOARD_LENGTH = 8;
let cellWidth = 65;
let gap = 3;
let boardGames;


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
]

window.onload = function() {
    boardGames = document.getElementById("boardGames");
    boardGames.style.width = cellWidth * 8 + (gap * 9);
    boardGames.style.height = cellWidth * 8 + (gap * 9);
    drawBoardGame()
}

// draw board game
function drawBoardGame() {
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            let makeBoard = document.createElement("div");
            makeBoard.style.position = "absolute";
            makeBoard.style.width = cellWidth+'px';
            makeBoard.style.height = cellWidth+'px';
            makeBoard.style.backgroundColor = 'green';
            makeBoard.style.left = (cellWidth + gap) * column + gap+'px';
            makeBoard.style.top = (cellWidth + gap) * row + gap+'px';

            boardGames.appendChild(makeBoard);
        }
    }
}