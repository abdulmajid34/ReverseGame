// set variabel
let BOARD_LENGTH = 8;
let cellWidth = 65;
let gap = 3;
let boardGames;
let initCoin;
let turn = 1;
let scoreLabel;
let canMoveCoin;
let coorSuggest = [];


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
    canMoveCoin = document.getElementById("canMoveCoin");
    boardGames = document.getElementById("boardGames");
    initCoin = document.getElementById("initCoin");
    scoreLabel = document.getElementById("score");
    boardGames.style.width = cellWidth * 8 + (gap * 9);
    boardGames.style.height = cellWidth * 8 + (gap * 9);
    drawBoardGame()
    displayCoin()
    drawCanMoveCoin();
}

// count score
function score() {
    let scoreWhite = 0;
    let scoreBlack = 0;

    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            let value = boards[row][column]

            if(value == 1) {
                scoreBlack += 1;
            } else if(value == 2) {
                scoreWhite += 1
            } else if(value != 0) {
                console.log("winner")
            }
        }
    }
    let countScore = scoreBlack + scoreWhite;
    if(countScore == BOARD_LENGTH * BOARD_LENGTH) {
        console.log("winner")
    }
    scoreLabel.innerHTML = "Black: "+ scoreBlack + " White: "+ scoreWhite;
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
            makeBoard.setAttribute("onclick", "clickedTurn("+row+", "+column+")")
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

// draw can move coin turn
function drawCanMoveCoin() {
    canMoveCoin.innerHTML = "";
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            let checkValue = boards[row][column];
            if(checkValue == 0 && canClickSpot(turn, row, column)) {
                let discOutline = document.createElement("div");
                discOutline.style.position = "absolute";
                discOutline.style.width = cellWidth - 8 +'px';
                discOutline.style.height = cellWidth - 8 +'px';
                discOutline.style.borderRadius = "50%"
                discOutline.style.cursor = "pointer"
                // make a board squares by one squares
                discOutline.style.left = (cellWidth + gap) * column + gap + 2+'px'; // column
                discOutline.style.top = (cellWidth + gap) * row + gap + 9 +'px'; // row
                discOutline.setAttribute("onclick", "clickedTurn("+row+", "+column+")");
                discOutline.style.zIndex = 2;
                if(turn == 1) {
                    discOutline.style.border = "2px solid black"
                }
                if(turn == 2) {
                    // let turnCom = document.createElement("a")
                    // turnCom.className = "coin-suggest-com";
                    // $('#canMoveCoin').append(
                    //     `<a class="coin-suggest-com" href=${this}></a>`
                    // )
                    setTimeout(() => {
                        discOutline.style.border = "2px solid white"
                        computerMove(turn, row, column)
                    }, 500)
                }
                canMoveCoin.appendChild(discOutline)
            }
        }
    }
}

// handle clicked turn player
function clickedTurn(row, column) {
    // console.log(row, column, 'test')

    // add conditional for when the user click on a coin other than value 0 or blank spot
    if(boards[row][column] != 0) {
        return;
    }

    if(canClickSpot(turn, row, column)) { // 
        let affectedBoard = getAffectedBoard(turn, row, column);
        flipCoin(affectedBoard)
        // console.log(boards[row][column], 'boards')
        boards[row][column] = turn;
        // console.log(boards[row][column], 'turn')
        if(turn == 1 && canMove(2)) {
            turn = 2
        } 
        // else if(turn == 2 && canMove(1)) {
        //     // turn = 1
        //     // setTimeout(() => {
        //     //     computerMove(turn, row, column)
        //     // }, 500)
        // }
    }
    // if(turn == 2) {
    //     setTimeout(() => {
    //         computerMove(turn, row, column)
    //     }, 500);
    // }
    // if(turn == 1) {
    //     clickedTurn(row, column)
    // } else if(turn == 2) {
    //     return;
    // }
    // boards[row][column] = 1
    computerMove(turn, row, column)
    displayCoin();
    score();
    drawCanMoveCoin();
}

// handle computer turn
function computerMove(turn, row, column) {
    console.log(turn, row, column, 'coord')
    // NOTES: COORDINAT SUGGESTED AI
    let coorLocation = {row:row,column:column}
    coorSuggest.push(coorLocation)
    // console.log(coorSuggest, 'test');
    // NOTES: RANDOM berdasarkan COORDINAT AI
    let randomTurn = Math.floor(Math.random() * coorSuggest.length)
    // console.log(coorSuggest[randomTurn], 'random');
    // console.log(turn, coorSuggest[randomTurn].row, coorSuggest[randomTurn].column, 'coord random')
    let valueAtSpot = boards[coorSuggest[randomTurn].row][coorSuggest[randomTurn].column]
    console.log(valueAtSpot, 'valueAtSpot')
    if(canClickSpot(turn, coorSuggest[randomTurn].row, coorSuggest[randomTurn].column) && valueAtSpot == 0) {
        console.log(turn, coorSuggest[randomTurn].row, coorSuggest[randomTurn].column, 'coord after if')
        let affectedBoard = getAffectedBoard(turn, coorSuggest[randomTurn].row, coorSuggest[randomTurn].column);
        console.log(affectedBoard, 'affectedBoard')
        flipCoin(affectedBoard);
        if(turn == 2 && canMove(1)) {
            turn = 1
        }
        
        // $('.coin-suggest-com').map(function() {
        //     coorSuggest.push($(this).attr('href'));
        //     setTimeout(() => {
        //         window.location.href = coorSuggest[randomTurn].row, coorSuggest[randomTurn].column
        //     }, 500) 
        //     
        // })
        // drawCanMoveCoin()
    } else {
        console.log("ELSE")
    }
}

// handle check canMove next turn player
function canMove(turnId) {
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            if(canClickSpot(turnId, row, column)) {
                return true;
            }
        }
    }
    return false;
}

// handle player can clicked turn 
function canClickSpot(turnId, row, column) {
    let affectedBoard = getAffectedBoard(turnId, row, column)
    // console.log(affectedBoard, 'test')
    if(affectedBoard.length == 0) {
        return false
    } else {
        return true
    }
}

// handle flip coin
function flipCoin(affectedCoin) {
    for(let i = 0; i < affectedCoin.length; i++) {
        let spot = affectedCoin[i]
        // console.log(spot, 'spot');
        if(boards[spot.row][spot.column] == 1) {
            boards[spot.row][spot.column] = 2
        } else {
            boards[spot.row][spot.column] = 1
        }
    }
}

// handle affected board or coin
function getAffectedBoard(turnId, row, column) {
    // console.log(row, column, 'test')
    let showAffectedCoin = [];

    // to the right
    let couldBeAffected = [];
    let columnIterator = column;
    while(columnIterator < BOARD_LENGTH-1) {
        columnIterator += 1;
        let valueAtSpot = boards[row][columnIterator];
        if(valueAtSpot == 0 || valueAtSpot == turnId) {
            if(valueAtSpot == turnId) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffected);
            }
            break;
        } else {
            let boardLocation = {row:row,column:columnIterator};
            // console.log(boardLocation, 'boardLocation')
            couldBeAffected.push(boardLocation)
        }
    }

    // to the left
    let couldBeAffectedLeft = [];
    let columnIteratorLeft = column;
    while(columnIteratorLeft > 0) {
        columnIteratorLeft -= 1;
        let valueAtSpot = boards[row][columnIteratorLeft];
        if(valueAtSpot == 0 || valueAtSpot == turnId) {
            if(valueAtSpot == turnId) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedLeft);
            }
            break;
        } else {
            let boardLocation = {row:row,column:columnIteratorLeft};
            couldBeAffectedLeft.push(boardLocation);
        }
    }

    // up
    let couldBeAffectedUp = [];
    let rowIteratorUp = row;
    while(rowIteratorUp > 0) {
        rowIteratorUp -= 1;
        let valueAtSpot = boards[rowIteratorUp][column];
        if(valueAtSpot == 0 || valueAtSpot == turnId) {
            if(valueAtSpot == turnId) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedUp);
            }
            break;
        } else {
            let boardLocation = {row:rowIteratorUp,column:column};
            couldBeAffectedUp.push(boardLocation);
        }
    }

    // down
    let couldBeAffectedDown = [];
    let rowIteratorDown = row;
    while(rowIteratorDown < BOARD_LENGTH-1) {
        rowIteratorDown += 1;
        let valueAtSpot = boards[rowIteratorDown][column];
        if(valueAtSpot == 0 || valueAtSpot == turnId) {
            if(valueAtSpot == turnId) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedDown);
            }
            break;
        } else {
            let boardLocation = {row:rowIteratorDown,column:column};
            couldBeAffectedDown.push(boardLocation);
        }
    }

    // down right
    let couldBeAffectedDownRight = [];
    let rowIteratorDownRight = row;
    let columnIteratorDownRight = column;
    // karna dia akan berjalan secara diagonal maka buat kondisi untuk mengecek row dan column nya
    while(rowIteratorDownRight < BOARD_LENGTH-1 && columnIteratorDownRight < BOARD_LENGTH-1) {
        rowIteratorDownRight += 1;
        columnIteratorDownRight += 1;
        let valueAtSpot = boards[rowIteratorDownRight][columnIteratorDownRight];
        if(valueAtSpot == 0 || valueAtSpot == turnId) {
            if(valueAtSpot == turnId) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedDownRight);
            }
            break;
        } else {
            let boardLocation = {row:rowIteratorDownRight,column:columnIteratorDownRight};
            couldBeAffectedDownRight.push(boardLocation);
        }
    }

    // down left
    let couldBeAffectedDownLeft = [];
    let rowIteratorDownLeft = row;
    let columnIteratorDownLeft = column;
    while(rowIteratorDownLeft < BOARD_LENGTH-1 && columnIteratorDownLeft > 0) {
        rowIteratorDownLeft += 1;
        columnIteratorDownLeft -= 1;
        let valueAtSpot = boards[rowIteratorDownLeft][columnIteratorDownLeft];
        if(valueAtSpot == 0 || valueAtSpot == turnId) {
            if(valueAtSpot == turnId) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedDownLeft);
            }
            break;
        } else {
            let boardLocation = {row:rowIteratorDownLeft,column:columnIteratorDownLeft};
            couldBeAffectedDownLeft.push(boardLocation);
        }
    }

    // up left
    let couldBeAffectedUpLeft = [];
    let rowIteratorUpLeft = row;
    let columnIteratorUpLeft = column;
    while(rowIteratorUpLeft > 0 && columnIteratorUpLeft > 0) {
        rowIteratorUpLeft -= 1;
        columnIteratorUpLeft -= 1;
        let valueAtSpot = boards[rowIteratorUpLeft][columnIteratorUpLeft];
        if(valueAtSpot == 0 || valueAtSpot == turnId) {
            if(valueAtSpot == turnId) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedUpLeft);
            }
            break;
        } else {
            let boardLocation = {row:rowIteratorUpLeft,column:columnIteratorUpLeft};
            couldBeAffectedUpLeft.push(boardLocation);
        }
    }

    // up right
    let couldBeAffectedUpRight = [];
    let rowIteratorUpRight = row;
    let columnIteratorUpRight = column;
    while(rowIteratorUpRight > 0 && columnIteratorUpRight < BOARD_LENGTH-1) {
        rowIteratorUpRight -= 1;
        columnIteratorUpRight += 1;
        let valueAtSpot = boards[rowIteratorUpRight][columnIteratorUpRight];
        if(valueAtSpot == 0 || valueAtSpot == turnId) {
            if(valueAtSpot == turnId) {
                showAffectedCoin = showAffectedCoin.concat(couldBeAffectedUpRight);
            }
            break;
        } else {
            let discLocation = {row:rowIteratorUpRight,column:columnIteratorUpRight};
            couldBeAffectedUpRight.push(discLocation);
        }
    }
    // console.log(showAffectedCoin, 'return')
    return showAffectedCoin
}

