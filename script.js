document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const resultModal = document.getElementById('result-modal');
    const resultMessage = document.getElementById('result-message');
    const restartBtn = document.getElementById('restartBtn');
    const modalRestartBtn = document.getElementById('modalRestartBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const clickedIndex = event.target.dataset.index;
        if (gameBoard[clickedIndex] === '' && gameActive) {
            gameBoard[clickedIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            checkForWinner();
            togglePlayer();
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkForWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        let draw = !gameBoard.includes('');

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                endGame(`${currentPlayer} wins!`);
                return;
            }
        }

        if (draw) {
            endGame('It\'s a draw!');
        }
    }

    function endGame(result) {
        gameActive = false;
        message.textContent = result;

        // Show result in modal
        resultMessage.textContent = result;
        resultModal.style.display = 'block';
    }

    function closeModal() {
        resultModal.style.display = 'none';
    }

    function restartGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });

        message.textContent = `Player X's turn`;
        resultModal.style.display = 'none';
    }

    restartBtn.addEventListener('click', restartGame);
    modalRestartBtn.addEventListener('click', restartGame);

    // Event listener for modal close button
    resultModal.addEventListener('click', function (event) {
        if (event.target === resultModal) {
            closeModal();
        }
    });

    // Initialize the game board
    createBoard();
});
