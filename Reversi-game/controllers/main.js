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

let blackBackground;
let gap = 3;
let BOARD_LENGTH = 8;
let cellWidth = 65;
let discLayer;
let turn = 1;
let scoreLabel;
let gameOver = false
let canMoveLayer;
let checkWinner;

let disc = [
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
    checkWinner = document.getElementById('winner')
    scoreLabel = document.getElementById("score");
    canMoveLayer = document.getElementById("canMoveLayer");
    blackBackground = document.getElementById("blackBackground");
    discLayer = document.getElementById("discLayer");
    blackBackground.style.width = cellWidth * 8 + (gap * 9);
    blackBackground.style.height = cellWidth * 8 + (gap * 9);
    drawGreenSquares()
    drawDisc();
    drawCanMoveLayer();
}

function drawGreenSquares() {
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            let greenSquare = document.createElement("div");
            // let width = greenSquare.offsetWidth;
            // let newWidth = width + 65;
            // let height = greenSquare.offsetHeight;
            // let newHeight = height + 65;
            // greenSquare.style.width = newWidth + 'px';
            // greenSquare.style.height = newHeight + 'px';
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
            blackBackground.appendChild(greenSquare)
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
            let value = disc[row][column]
            if(value == 1) {
                scoreBlack += 1
            } else if(value == 2) {
                scoreWhite += 1
            }
        }
    }
    showWinner(scoreBlack, scoreWhite)
    scoreLabel.innerHTML = "Black: "+ scoreBlack + " White: "+ scoreWhite;
}

// event click square
function clickedSquare(row, column) {
    if(gameOver) {
        return;
    }
    /* 
        jika pengguna diizinkan untuk mengklik di sini 
        dapatkan semua disk yang terpengaruh
        balikkan
    */

    // add conditional if blank spot
    if(disc[row][column] != 0) {
        return;
    }

    // cek apakah terdapat spot blank atau 0
    if(canClickSpot(turn, row, column) == true) {
        // getAffectedDisc adalah fungsi untuk mendapatkan perubahan dari disc setelah di click
        let affectedDisc = getAffectedDisc(turn, row, column);
        // flipDisc adalah fungsi untuk merubah disc setelah fungsi getAffectedDisc mendapatkan perubahan
        flipDisc(affectedDisc);
        disc[row][column] = turn
        if(turn == 1 && canMove(1)) {
            turn = 2
        } else if(turn == 2 && canMove(2)) {
            turn = 1
        }
        if(canMove(1) == false && canMove(2) == false) {
            showWinner()
            gameOver = true
        }
        drawDisc();
        drawCanMoveLayer();
        showScore();
    }
}

function drawCanMoveLayer() {
    canMoveLayer.innerHTML = ""
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            let checkValue = disc[row][column];
            console.log(checkValue, 'drawCanMoveLayer')
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

// untuk mengklik kotak yang kosong dan di cek
function canClickSpot(id, row, column) {
    console.log(id, row, column, 'id-row-col')
    /* 
        if the number of affected disc by clicking at this spot would be 0
        return false
        otherwise return true
    */
    let affectedDisc = getAffectedDisc(id, row, column);
    console.log(affectedDisc, 'canClickSpot')
    if(affectedDisc.length == 0) {
        return false
    } else {
        return true
    }
}

function flipDisc(affectedDisc) {
    console.log(affectedDisc, 'flipDisc')
    /* 
        for all item in the list: affectedDisc:
        if the disc at that has spot as value 1
            make it a 2
        else 
            make it a 1
    */
    for(let i = 0; i < affectedDisc.length; i++) {
        let spot = affectedDisc[i]
        if(disc[spot.row][spot.column] == 1) {
            disc[spot.row][spot.column] = 2;
        } else {
            disc[spot.row][spot.column] = 1
        }
    }
}   

function getAffectedDisc(id, row, column) {
    let showAffectedDisc = [];
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
    while(colIterator < 7) {
        colIterator += 1;
        let valueAtSpot = disc[row][colIterator];
        console.log(valueAtSpot, 'getAffectedDisc');
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedDisc = showAffectedDisc.concat(couldBeAffected);
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
        let valueAtSpot = disc[row][colIteratorLeft];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedDisc = showAffectedDisc.concat(couldBeAffectedLeft);
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
        let valueAtSpot = disc[rowIteratorAbove][column];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedDisc = showAffectedDisc.concat(couldBeAffectedAbove);
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
        let valueAtSpot = disc[rowIteratorBelow][column];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedDisc = showAffectedDisc.concat(couldBeAffectedBelow);
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
        let valueAtSpot = disc[rowIteratorDownRight][colIteratorDownRight];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedDisc = showAffectedDisc.concat(couldBeAffectedDownRight);
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
        let valueAtSpot = disc[rowIteratorDownLeft][colIteratorDownLeft];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedDisc = showAffectedDisc.concat(couldBeAffectedDownLeft);
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
        let valueAtSpot = disc[rowIteratorUpLeft][colIteratorUpLeft];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedDisc = showAffectedDisc.concat(couldBeAffectedUpLeft);
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
        let valueAtSpot = disc[rowIteratorUpRight][colIteratorUpRight];
        if(valueAtSpot == 0 || valueAtSpot == id) {
            if(valueAtSpot == id) {
                showAffectedDisc = showAffectedDisc.concat(couldBeAffectedUpRight);
            }
            break;
        } else {
            let discLocation = {row:rowIteratorUpRight,column:colIteratorUpRight};
            couldBeAffectedUpRight.push(discLocation);
        }
    }

    return showAffectedDisc
}

function drawDisc() {
    discLayer.innerHTML = ""
    for(let row = 0; row < BOARD_LENGTH; row++) {
        for(let column = 0; column < BOARD_LENGTH; column++) {
            let checkValue = disc[row][column];
            // ngecek apakah terdapat value selain 1 dan 2
            if(checkValue == 0) {

            } else {
                // buat tampilan coin dengan menambahkan element div baru
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
                discLayer.appendChild(makeCoin)
            }
        }
    }
}