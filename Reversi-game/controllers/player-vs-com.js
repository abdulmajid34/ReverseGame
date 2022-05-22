// set variabel
let BOARD_LENGTH = 8;
let cellWidth = 65;
let gap = 3;
let boardGames;
let initCoin;


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
    initCoin = document.getElementById("initCoin");
    boardGames.style.width = cellWidth * 8 + (gap * 9);
    boardGames.style.height = cellWidth * 8 + (gap * 9);
    drawBoardGame()
    displayCoin()
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

// draw init coin
function displayCoin() {
    initCoin.innerHTML = "";
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            let checkValueBoard = boards[row][column];

            // check board if value other than 0
            if(checkValueBoard == 0) {

            } else {
                // make a display init coin with new element div
                let makeCoin = document.createElement("div");
                makeCoin.style.position = "absolute";
                makeCoin.style.width = cellWidth+'px';
                makeCoin.style.height = cellWidth+'px';
                makeCoin.style.borderRadius = "50%";
                makeCoin.style.marginTop = "8px";
                makeCoin.style.left = (cellWidth + gap) * column + gap+'px';
                makeCoin.style.top = (cellWidth + gap) * row + gap+'px';

                if(checkValueBoard == 1) {
                    makeCoin.style.backgroundImage = "radial-gradient(#333333 30%, black 70%)"
                } else {
                    makeCoin.style.backgroundImage = "radial-gradient(white 30%, #cccccc 70%)";
                }
                initCoin.appendChild(makeCoin);
            }
        }
    }
}