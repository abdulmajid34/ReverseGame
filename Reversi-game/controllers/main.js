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
let coinLayer;
let turn = 1;
let scoreLabel;
let gameOver = false
let canMoveLayer;
let checkWinner;

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

// event handler 
window.onload = function() {
    checkWinner = document.getElementById('winner')
    scoreLabel = document.getElementById("score");
    canMoveLayer = document.getElementById("canMoveLayer");
    boardBackground = document.getElementById("boardBackground");
    coinLayer = document.getElementById("coinLayer");
    boardBackground.style.width = cellWidth * 8 + (gap * 9);
    boardBackground.style.height = cellWidth * 8 + (gap * 9);
    drawBoardSquares()
    displayCoin();
    drawCanMoveCoin();
}

// Draw Board
function drawBoardSquares() {
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            // console.log(row, column, 'r c');
            // make a new element div for squares board
            let greenSquare = document.createElement("div");
            greenSquare.style.position = "absolute";
            greenSquare.style.width = cellWidth+'px';
            greenSquare.style.height = cellWidth+'px';
            greenSquare.style.backgroundColor = "grey";
            greenSquare.style.cursor = "pointer"
            // make a board squares by one squares
            greenSquare.style.left = (cellWidth + gap) * column + gap+'px'; // column
            greenSquare.style.top = (cellWidth + gap) * row + gap+'px'; // row
            // add event onclicm define with setAttribute and make function with parameter row and column
            greenSquare.setAttribute("onclick", "clickedSquare("+row+", "+column+")");
            boardBackground.appendChild(greenSquare)
        }
    }
}

function showWinner(BLACK, WHITE) {
    // let isWinner = document.createElement('div');
    let textWinner = 'End of Game! The Winner is ';
    if(BLACK > WHITE) {
        checkWinner.innerHTML = textWinner + "Black"
    } else {
        checkWinner.innerHTML = textWinner + "White"
    }
}

function showScore() {
    let scoreWhite = 0;
    let scoreBlack = 0;

    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            let value = boards[row][column]
            if(value == 1) {
                scoreBlack += 1
            } else if(value == 2) {
                scoreWhite += 1
            }
        }
    }
    scoreLabel.innerHTML = "Black: "+ scoreBlack + " White: "+ scoreWhite;
    // showWinner(scoreBlack, scoreWhite)
}

// handle event click in square
function clickedSquare(row, column) {
    if(gameOver) {
        // showWinner()
        return
    }
    /* 
        if the user is allowed to click here
        get all affected coin
        flip them
    */

    // add conditional if blank spot
    if(boards[row][column] != 0) {
        return;
    }

    // cek apakah terdapat spot blank atau 0
    if(canClickSpot(turn, row, column) == true) {
        let affectedBoard = getAffectedBoard(turn, row, column);
        flipDisc(affectedBoard);
        boards[row][column] = turn
        if(turn == 1 && canMove(1)) {
            turn = 2
        } else if(turn == 2 && canMove(2)) {
            turn = 1
        }
        if(canMove(1) == false && canMove(2) == false) {
            // showWinner()
            alert('game over')
            gameOver = true
        }
        displayCoin();
        drawCanMoveCoin();
        showScore();
    }
}

// make suggestion turn coin
function drawCanMoveCoin() {
    canMoveLayer.innerHTML = ""
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            let checkValue = boards[row][column];
            // console.log(checkValue, 'drawCanMoveCoin')   
            // ngecek apakah terdapat value selain 1 dan 2
            if(checkValue == 0 && canClickSpot(turn, row, column)) {
                // buat tampilan coin dengan menambahkan element div baru
                let discOutline = document.createElement("div");
                discOutline.style.position = "absolute";
                discOutline.style.width = cellWidth - 60 +'px';
                discOutline.style.height = cellWidth - 60 +'px';
                discOutline.style.borderRadius = "50%"
                discOutline.style.marginTop = "8px";
                // make a board squares by one squares
                discOutline.style.left = (cellWidth + 9 + gap) * column + gap+'px'; // column
                discOutline.style.top = (cellWidth + 9 + gap) * row + gap +'px'; // row
                discOutline.style.zIndex = 2;
                if(turn == 1) {
                    discOutline.style.border = "2px solid black"
                }
                if(turn == 2) {
                    discOutline.style.border = "2px solid white"
                }
                canMoveLayer.appendChild(discOutline)
            }
        }
    }
}

function canMove(id) {
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            if(canClickSpot(id, row, column)) {
                return true;
            }
        }
    }
    return false;
}

// handle even allowed to click spot
function canClickSpot(id, row, column) {
    // console.log(id, row, column, 'id-row-col')
    /* 
        if the number of affected disc by clicking at this spot would be 0
        return false
        otherwise return true
    */
    let affectedBoard = getAffectedBoard(id, row, column);
    // console.log(affectedDisc, 'canClickSpot')
    if(affectedBoard.length == 0) {
        return false
    } else {
        return true
    }
}

// function to change coin after getAffectedBoard
function flipDisc(affectedCoin) {
    // console.log(affectedDisc, 'flipDisc')
    /* 
        for all item in the list: affectedDisc:
        if the disc at that has spot as value 1
            make it a 2
        else 
            make it a 1
    */
    for(let i = 0; i < affectedCoin.length; i++) {
        let spot = affectedCoin[i]
        if(boards[spot.row][spot.column] == 1) {
            boards[spot.row][spot.column] = 2;
        } else {
            boards[spot.row][spot.column] = 1
        }
    }
}   

// handle change for coin and board
function getAffectedBoard(id, row, column) {
    let showAffectedCoin = [];
    /* 
        from current spot:
        for all eight directions. (left right up down and 4 diagonals)
           move along in direction until your reach a blank or your own color
           (keeping track of all the opposite color locations along the may)
        if the terminal title is your own color
            add those locations to the list that will be returned
        return the list of affected disc
    */

    // to the right
    let couldBeAffected = [];
    let colIterator = column;
    // console.log(colIterator, 'col');
    while(colIterator < 7) {
        colIterator += 1;
        let valueAtSpot = boards[row][colIterator];
        // console.log(valueAtSpot, 'getAffectedBoard');
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffected);
            }
            break;
        } else {
            let discLocation = {row:row,column:colIterator};
            couldBeAffected.push(discLocation);
        }
    }
    
    // to the left
    let couldBeAffectedLeft = [];
    let colIteratorLeft = column;
    while(colIteratorLeft > 0) {
        colIteratorLeft -= 1;
        let valueAtSpot = boards[row][colIteratorLeft];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedLeft);
            }
            break;
        } else {
            let discLocation = {row:row,column:colIteratorLeft};
            couldBeAffectedLeft.push(discLocation);
        }
    }

    // above
    let couldBeAffectedAbove = [];
    let rowIteratorAbove = row;
    while(rowIteratorAbove > 0) {
        rowIteratorAbove -= 1;
        let valueAtSpot = boards[rowIteratorAbove][column];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedAbove);
            }
            break;
        } else {
            let discLocation = {row:rowIteratorAbove,column:column};
            couldBeAffectedAbove.push(discLocation);
        }
    }

    // below
    let couldBeAffectedBelow = [];
    let rowIteratorBelow = row;
    while(rowIteratorBelow < 7) {
        rowIteratorBelow += 1;
        let valueAtSpot = boards[rowIteratorBelow][column];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedBelow);
            }
            break;
        } else {
            let discLocation = {row:rowIteratorBelow,column:column};
            couldBeAffectedBelow.push(discLocation);
        }
    }

    // downRight
    let couldBeAffectedDownRight = [];
    let rowIteratorDownRight = row;
    let colIteratorDownRight = column;
    // karna dia akan berjalan secara diagonal maka buat kondisi untuk mengecek row dan column nya
    while(rowIteratorDownRight < 7 && colIteratorDownRight < 7) {
        rowIteratorDownRight += 1;
        colIteratorDownRight += 1;
        let valueAtSpot = boards[rowIteratorDownRight][colIteratorDownRight];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedDownRight);
            }
            break;
        } else {
            let discLocation = {row:rowIteratorDownRight,column:colIteratorDownRight};
            couldBeAffectedDownRight.push(discLocation);
        }
    }

    // down left
    let couldBeAffectedDownLeft = [];
    let rowIteratorDownLeft = row;
    let colIteratorDownLeft = column;
    while(rowIteratorDownLeft < 7 && colIteratorDownLeft > 0) {
        rowIteratorDownLeft += 1;
        colIteratorDownLeft -= 1;
        let valueAtSpot = boards[rowIteratorDownLeft][colIteratorDownLeft];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedDownLeft);
            }
            break;
        } else {
            let discLocation = {row:rowIteratorDownLeft,column:colIteratorDownLeft};
            couldBeAffectedDownLeft.push(discLocation);
        }
    }

    // up left
    let couldBeAffectedUpLeft = [];
    let rowIteratorUpLeft = row;
    let colIteratorUpLeft = column;
    while(rowIteratorUpLeft > 0 && colIteratorUpLeft > 0) {
        rowIteratorUpLeft -= 1;
        colIteratorUpLeft -= 1;
        let valueAtSpot = boards[rowIteratorUpLeft][colIteratorUpLeft];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedUpLeft);
            }
            break;
        } else {
            let discLocation = {row:rowIteratorUpLeft,column:colIteratorUpLeft};
            couldBeAffectedUpLeft.push(discLocation);
        }
    }

    // up left
    let couldBeAffectedUpRight = [];
    let rowIteratorUpRight = row;
    let colIteratorUpRight = column;
    while(rowIteratorUpRight > 0 && colIteratorUpRight < 7) {
        rowIteratorUpRight -= 1;
        colIteratorUpRight += 1;
        let valueAtSpot = boards[rowIteratorUpRight][colIteratorUpRight];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedUpRight);
            }
            break;
        } else {
            let discLocation = {row:rowIteratorUpRight,column:colIteratorUpRight};
            couldBeAffectedUpRight.push(discLocation);
        }
    }

    return showAffectedCoin
}

// make coin display
function displayCoin() {
    coinLayer.innerHTML = ""
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            let checkValue = boards[row][column];
            // check value from board length
            if(checkValue == 0) {
                // return;
            } else {
                // make a display coin with new element div
                let makeCoin = document.createElement("div");
                makeCoin.style.position = "absolute";
                makeCoin.style.width = cellWidth +'px';
                makeCoin.style.height = cellWidth +'px';
                makeCoin.style.borderRadius = "50%"
                makeCoin.style.marginTop = "8px"
                // make a board squares by one squares
                makeCoin.style.left = (cellWidth + gap) * column + gap+'px'; // column
                makeCoin.style.top = (cellWidth + gap) * row + gap +'px'; // row
                
                
                if(checkValue == 1) {
                    makeCoin.style.backgroundColor = "black"
                } else {
                    makeCoin.style.backgroundColor = "white"
                }
                coinLayer.appendChild(makeCoin)
            }
        }
    }
}