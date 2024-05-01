

/*-------------------------------- Summary of game logic --------------------------------*/

// -- The 'handleClick' function is the only function to take the event in this whole game.
// -- It grabs the DOM square index id which is a number that corresponds to the board array (index 0-8).
// -- The player defaults initially to X, so it places an X in the array for play1
// -- It then runs checks to see if the array has been affected in such a way that would conclude the game (if win, if tie)
// -- Finally, it switches the player with really simple conditional logic between clicks, i.e. if it's not X then it must be O, as long as there isn't already a winner.
// -- It incorporates some click disabling conditions in there too, to make sure the game does end if a tie or win is detected or so that a cell can't be selected twice.
// -- Through render, the visible board and h2 are updated based on the status of correlated variables.


/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    // Horizontals
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Verticals
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ]
  

/*---------------------------- Variables (state) ----------------------------*/

let board = ["", "", "",
"", "", "", 
"", "", ""]
let turn = "X"
let winner = false
let tie = false

/*------------------------ Cached Element References ------------------------*/

//const boardEl = document.querySelectorAll(".board")
const squareEls = document.querySelectorAll(".sqr")
const messageEl = document.querySelector("#message")
const resetBtnEl = document.querySelector("#reset")

/*-------------------------------- Functions --------------------------------*/

// INITIALIZING

window.onload = init();

function init() {
    render()
}

//GAMEPLAY

// ! This equates the empty string in the board array with the value of the current player/turn (X or O). (TEST SUCCESSFUL)
//When called in the handleClick(e) function, it grabs the position from the id of the clicked button, so it knows where to place the X or O in the array.
function placePiece(i) {
    board[i] = turn
    console.log(board)
}


// ! 5/ Conditional logic based on possible outcomes using board array (not the 2D array) (TEST SUCCESSFUL)
function checkForWinner() {
//For each winning combination, you’ll check if the first position is something other than an empty string.
    if (board[0] !== "")  {
        // If it is, you’ll check if the value in the first position matches the value in the second position.
        if (board[0] === board[1]) {
                //If it is, you’ll check if the value in the first position matches the value in the third position. If it is, then you’ll have a winner! 
            if (board[0] === board[2]) {
                winner = true
            }
        }
            
    }
    if (board[3] !== "")  {
        if (board[3] === board[4]) {
            if (board[3] === board[5]) {
                winner = true
            }
        }
            
    }
    if (board[6] !== "")  {
        if (board[6] === board[7]) {
            if (board[6] === board[8]) {
                winner = true
            }
        }
            
    }
    //! Verticals
    if (board[0] !== "")  {
        if (board[0] === board[3]) {
            if (board[0] === board[6]) {
                winner = true
            }
        }
            
    }
    if (board[1] !== "")  {
        if (board[1] === board[4]) {
            if (board[1] === board[7]) {
                winner = true
            }
        }
            
    }
    if (board[2] !== "")  {
        if (board[2] === board[5]) {
            if (board[2] === board[8]) {
                winner = true
            }
        }
            
    }
    // ! Diagonals
    if (board[0] !== "")  {
        if (board[0] === board[4]) {
            if (board[0] === board[8]) {
                winner = true
            }
        }
            
    }
    if (board[2] !== "")  {
        if (board[2] === board[4]) {
            if (board[2] === board[6]) {
                winner = true
            }
        }
            
    }
}

// ! Level up option - not including in my running code as I found it through a lot of searching and discussion, so don't want to take credit!
// ? Here, combo is the current array within the array of arrays being looped through.
// ? we're creating three new variables value1, value2, and value 3, which equate to the three index values
// ? of the current combo. 
// ? We then have some conditional logic to say if value one isn't empty, and it's the same as value 2 and if
// ? it's also the same as value 3, we know we have a winner. 
// ? This is much more efficient as it will perform the check on every array with reference to the 8 possible winning combos, rather than us manually checking all 8 possibilities as above.
// function checkForWinner() {
//     winningCombos.forEach(combo => {
//         const value1 = combo[0];
//         const value2 = combo[1];
//         const value3 = combo[2];
//         if (board[value1] !== "" && board[value1] === board[value2] && board[value1] === board[value3]) {
//             winner = true;
//         }
//     });
// }

//! Check for tie (NOT TESTED BUT WORKS ONCE RENDERED)
function checkForTie() {
    //Check if there is a winner. If there is, return out of the function.
    if (winner === true) {
        return
    }
    // Check if the board array still contains any elements with a value of ''. If it does, we can leave tie as false. Otherwise, tie should be set to true.
    const anyEmpty = board.some((sqr) => {
        return sqr === ""
    })
    if (anyEmpty === true) {
        tie = false 
    } else {
        tie = true
    }
}

//! Switch player turn (TEST SUCCESSFUL)
function switchPlayerTurn() {
    if (winner === true) {
        return
    } else {
        // If winner is false, change the turn by checking the current value of turn. If it is 'X' then change turn to 'O'. If it is 'O' then change turn to 'X'.
        if (turn === "X") {
            turn = "O"
        } else if (turn === "O") {
            turn = "X"
        }
    } 
}


//! Handling a player click with a master function (which will call other later defined functions)
function handleClick(e) {
    const squareIndex = e.target.id
    // ? Instructions say "if the board has a VALUE of 'X or 'O at the squareIndex position, immediately return out of HandleClick().
    // ? So I need to find a way to check if the board has an X or O value at the squareIndex position. 
    // ? I've pulled through the id of the html div in squareIndex (#0-8).
    // ? I need to compare that with the board array position - you do this by reference to the board array and its index (which is equivalent to the event.target.id)
    // ? It works!
    if (board[squareIndex] === "X" || board[squareIndex] === "O") {
        return
    } 
    if (winner === true) {
        return
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}


//! RESET FUNCTIONALITY

function resetGame() {
    board = ["", "", "",
    "", "", "", 
    "", "", ""];
    turn = "X";
    winner = false;
    tie = false;
    init();
    }
    


// RENDERING

function render() {
    updateBoard()
    updateMessage()
}

//! 1/ Making the link between the Board array (empty strings now but will be dynamically updated) and the squareEls div array.
// The purpose of this function is to update the DOM with the value of the board array.
// We can do this by looping through the board array recording the value of each element at the given point in time (X, O or "") as the first parameter and its index as the second. 
// With this information, we can set a new variable called currentSqr which stores the relevant DOM square (the ids on the dom elements are the same as the array indexes).
// With that, we can update the innerText value of the DOM element with the value currently shown in the array.
function updateBoard() {
    board.forEach((value, i) => {
    let currentSqr = squareEls[i]
    currentSqr.innerText = value
    })
}


//! 2/ Updating the message based on the status of the turn, winner, and tie variables. This involves updating the h2 with the id of message in the messageEl vairable.
function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.innerText = "It is " + turn + "'s turn."
    } else if (winner === false && tie === true) {
        messageEl.innerText = "It's a draw!"
    } else {
        messageEl.innerText = "Congratulations " + turn + " wins!"
    }
} 




/*----------------------------- Event Listeners -----------------------------*/


squareEls.forEach((sqrEl) => {
    sqrEl.addEventListener("click", handleClick)
})

resetBtnEl.addEventListener("click", resetGame)

// ! Come back to the level up
//boardEl.addEventListener(click, handleClick)
