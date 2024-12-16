const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('.reset');
const winnerBanner = document.querySelector('.winner-banner');
const winnerText = document.querySelector('.winner-text');

let currentPlayer = 'Player 1';
let currentSymbol = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Handle clicking on individual cells, not the whole board
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    // If cell is already taken or game is inactive, return early
    if (boardState[index] || !gameActive) return;

    // Mark the cell with the current player's symbol
    boardState[index] = currentSymbol;
    cell.textContent = currentSymbol;
    cell.classList.add('taken');

    // Check for a win
    if (checkWin()) {
        highlightWinningCells();
        showWinner();
        return;
    }

    // Check for a draw
    if (boardState.every(cell => cell !== null)) {
        showDraw();
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWin() {
    return winningCombinations.some(combination => 
        combination.every(index => boardState[index] === currentSymbol)
    );
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => boardState[index] === currentSymbol)) {
            combination.forEach(index => cells[index].classList.add('win'));
        }
    });
}

function showWinner() {
    gameActive = false;
    winnerText.textContent = `${currentPlayer} Wins! 🎉`;
    winnerBanner.style.display = 'block';
}

function showDraw() {
    gameActive = false;
    winnerText.textContent = "It's a Draw! 🤝";
    winnerBanner.style.display = 'block';
}

function resetGame() {
    currentPlayer = 'Player 1';
    currentSymbol = 'X';
    boardState.fill(null);
    gameActive = true;
    statusText.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell'; // Reset to default state
    });
    winnerBanner.style.display = 'none';
}

// Add event listener to each cell individually to prevent board clicks
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
