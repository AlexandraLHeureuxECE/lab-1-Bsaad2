const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = Array(9).fill(null); // "X", "O", or null
let currentPlayer = "X";
let gameOver = false;

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function renderBoard() {
  boardEl.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const btn = document.createElement("button");
    btn.className = "cell";
    btn.type = "button";
    btn.setAttribute("role", "gridcell");
    btn.setAttribute("aria-label", `Cell ${i + 1}`);
    btn.textContent = board[i] ?? "";
    btn.disabled = gameOver || board[i] !== null;

    btn.addEventListener("click", () => handleMove(i));
    boardEl.appendChild(btn);
  }
}

function checkWinner() {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // "X" or "O"
    }
  }
  return null;
}

function isDraw() {
  return board.every((cell) => cell !== null);
}

function setStatus(text) {
  statusEl.textContent = text;
}

function handleMove(index) {
  if (gameOver) return;
  if (board[index] !== null) return;

  board[index] = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    setStatus(`Player ${winner} wins!`);
    renderBoard();
    return;
  }

  if (isDraw()) {
    gameOver = true;
    setStatus("Draw!");
    renderBoard();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  setStatus(`Player ${currentPlayer}’s turn`);
  renderBoard();
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  setStatus("Player X’s turn");
  renderBoard();
}

restartBtn.addEventListener("click", resetGame);

// initial load
resetGame();
