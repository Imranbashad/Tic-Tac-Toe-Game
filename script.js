const gameSetup = document.getElementById("game-setup");
const ticTacToe = document.getElementById("tic-tac-toe");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const startGameBtn = document.getElementById("start-game");
const turnIndicator = document.getElementById("turn-indicator");
const restartGameBtn = document.getElementById("restart-game");
const newGameBtn = document.getElementById("start-new-game");
const cells = document.querySelectorAll("[data-cell]");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let isGameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

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

startGameBtn.addEventListener("click", () => {
  player1 = player1Input.value;
  player2 = player2Input.value;

  if (!player1 || !player2) {
    alert("Please Enter both players name");
    return;
  }

  currentPlayer = player1;
  turnIndicator.innerText = `${currentPlayer}'s turn`;

  gameSetup.classList.add("hidden");
  ticTacToe.classList.remove("hidden");
});

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    if (!isGameActive || e.target.innerText !== "") {
      return;
    }

    handleCellPlayed(e.target, currentPlayer);

    if (checkWinner()) {
      turnIndicator.innerText = `${currentPlayer} wins!`;
      endGame();
    } else if (checkDraw()) {
      turnIndicator.innerText = `It's a draw!`;
      endGame();
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      turnIndicator.innerText = `${currentPlayer}'s turn`;
    }
  });
});

function handleCellPlayed(cell, player) {
  const cellIndex = Array.from(cells).indexOf(cell);
  gameState[cellIndex] = player === player1 ? "X" : "O";
  cell.innerText = gameState[cellIndex];
}

function checkWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => gameState[index] === (currentPlayer === player1 ? "X" : "O"));
  });
}

function checkDraw() {
  return gameState.every((cell) => cell !== "");
}

function endGame() {
  isGameActive = false;
  restartGameBtn.classList.remove("hidden");
  newGameBtn.classList.remove("hidden");
}

restartGameBtn.addEventListener("click", () => {
  resetGame();
  currentPlayer = player1;
  turnIndicator.innerText = `${currentPlayer}'s turn`;
});

newGameBtn.addEventListener("click", () => {
  gameSetup.classList.remove("hidden");
  ticTacToe.classList.add("hidden");
  resetGame();
});

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.innerText = ""));
  isGameActive = true;
  restartGameBtn.classList.add("hidden");
  newGameBtn.classList.add("hidden");
}
