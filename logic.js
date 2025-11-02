const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');


let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
function handleCellPlayed(clickedCell, clickedCellIndex) {
            boardState[clickedCellIndex] = currentPlayer;
            clickedCell.innerHTML = currentPlayer;
            clickedCell.classList.add(currentPlayer.toLowerCase());
        }

 function handlePlayerChange() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.innerHTML = currentPlayer === 'X' ? "Your turn (X)" : "Computer's turn (O)";
            
            // If the game is active and it's the computer's turn, wait briefly then move
            if (gameActive && currentPlayer === 'O') {
                // Use a short delay for a better user experience (simulated "thinking")
                setTimeout(computerMove, 600); 
            }
        }
function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i < winningConditions.length; i++) {
                const winCondition = winningConditions[i];
                const a = boardState[winCondition[0]];
                const b = boardState[winCondition[1]];
                const c = boardState[winCondition[2]];

                // Skip if any cell in the condition is empty
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                
                // Check if all three cells are the same
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                if (currentPlayer === 'X') {
                    statusDisplay.innerHTML = "🎉 Congratulations! You have won! 🎉";
                } else {
                    statusDisplay.innerHTML = "😔 The computer has won! 😔";
                }
                gameActive = false;
                return;
            }

            // Check for a draw (no empty strings left in boardState)
            let roundDraw = !boardState.includes('');
            if (roundDraw) {
                statusDisplay.innerHTML = "🤝 Game is a draw! 🤝";
                gameActive = false;
                return;
            }

            
            handlePlayerChange();
        }
function computerMove() {
            // Find all indices of empty cells
            const availableCells = [];
            for (let i = 0; i < boardState.length; i++) {
                if (boardState[i] === '') {
                    availableCells.push(i);
                }
            }

            if (availableCells.length > 0) {
                // Pick a random available index
                const randomIndex = Math.floor(Math.random() * availableCells.length);
                const computerIndex = availableCells[randomIndex];
                
                // Get the corresponding HTML element
                const clickedCell = cells[computerIndex];
                
                // Make the move and check the result
                handleCellPlayed(clickedCell, computerIndex);
                handleResultValidation();
            }
        }

function handleCellClick(event) {
            const clickedCell = event.target;
            const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

            // Guard clause: stop if cell is taken, game is over, or it's not player X's turn
            if (boardState[clickedCellIndex] !== '' || !gameActive || currentPlayer === 'O') {
                return;
            }

            handleCellPlayed(clickedCell, clickedCellIndex);
            handleResultValidation();
        }

 /**
  * Resets all game variables and clears the board visually.
 */
function handleResetGame() {
     currentPlayer = 'X';
     gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
     statusDisplay.innerHTML = "Your turn (X)";
    cells.forEach(cell => {
      cell.innerHTML = '';
     cell.classList.remove('x', 'o');
  });
 }

        // --- Event Listeners ---
        // Attach click listener to every cell
        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        
        // Attach click listener to the reset button
        resetButton.addEventListener('click', handleResetGame);

        // Set initial status message on load
        statusDisplay.innerHTML = "Your turn (X)";

    

