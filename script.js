const SIZE = 10;
const MINES = 10;

const board = document.getElementById("board");
const minesLabel = document.getElementById("mines");
const timerLabel = document.getElementById("timer");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let cells = [];
let gameOver = false;
let flags = 0;
let seconds = 0;
let timer = null;

function createBoard() {
  board.innerHTML = "";
  cells = [];
  gameOver = false;
  flags = 0;
  seconds = 0;
  clearInterval(timer);
  timer = null;
  timerLabel.textContent = "0";
  minesLabel.textContent = MINES;
  message.textContent = "";

  for (let row = 0; row < SIZE; row++) {
    cells[row] = [];

    for (let col = 0; col < SIZE; col++) {
      const cell = {
        row,
        col,
        mine: false,
        revealed: false,
        flagged: false,
        adjacent: 0,
        element: document.createElement("button")
      };

      cell.element.className = "cell";
      cell.element.setAttribute("aria-label", "Casilla oculta");

      cell.element.addEventListener("click", () => reveal(row, col));

      cell.element.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        toggleFlag(row, col);
      });

      board.appendChild(cell.element);
      cells[row][col] = cell;
    }
  }

  placeMines();
  calculateNumbers();
}

function placeMines() {
  let placed = 0;

  while (placed < MINES) {
    const row = Math.floor(Math.random() * SIZE);
    const col = Math.floor(Math.random() * SIZE);

    if (!cells[row][col].mine) {
      cells[row][col].mine = true;
      placed++;
    }
  }
}

function calculateNumbers() {
  for (const row of cells) {
    for (const cell of row) {
      cell.adjacent = getNeighbors(cell.row, cell.col)
        .filter(neighbor => neighbor.mine)
        .length;
    }
  }
}

function getNeighbors(row, col) {
  const neighbors = [];

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;

      const r = row + dr;
      const c = col + dc;

      if (r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
        neighbors.push(cells[r][c]);
      }
    }
  }

  return neighbors;
}

function startTimer() {
  if (timer || gameOver) return;

  timer = setInterval(() => {
    seconds++;
    timerLabel.textContent = seconds;
  }, 1000);
}

function reveal(row, col) {
  if (gameOver) return;

  const cell = cells[row][col];

  if (cell.revealed || cell.flagged) return;

  startTimer();

  if (cell.mine) {
    cell.revealed = true;
    cell.element.textContent = "💣";
    cell.element.classList.add("revealed", "mine");
    endGame(false);
    return;
  }

  revealCell(cell);

  if (hasWon()) {
    endGame(true);
  }
}

function revealCell(cell) {
  if (cell.revealed || cell.flagged || cell.mine) return;

  cell.revealed = true;
  cell.element.classList.add("revealed");
  cell.element.setAttribute("aria-label", "Casilla descubierta");

  if (cell.adjacent > 0) {
    cell.element.textContent = cell.adjacent;
    cell.element.classList.add(`n${cell.adjacent}`);
    return;
  }

  for (const neighbor of getNeighbors(cell.row, cell.col)) {
    revealCell(neighbor);
  }
}

function toggleFlag(row, col) {
  if (gameOver) return;

  const cell = cells[row][col];

  if (cell.revealed) return;

  if (!cell.flagged && flags >= MINES) return;

  cell.flagged = !cell.flagged;
  flags += cell.flagged ? 1 : -1;

  cell.element.textContent = cell.flagged ? "🚩" : "";
  cell.element.classList.toggle("flagged", cell.flagged);
  minesLabel.textContent = MINES - flags;
}

function hasWon() {
  return cells.flat().every(cell => cell.mine || cell.revealed);
}

function endGame(won) {
  gameOver = true;
  clearInterval(timer);

  if (won) {
    message.textContent = `🎉 ¡Has ganado en ${seconds} segundos!`;
    revealAll(false);
  } else {
    message.textContent = "💥 Has perdido. ¡Prueba otra vez!";
    revealAll(true);
  }
}

function revealAll(showMines) {
  for (const cell of cells.flat()) {
    if (cell.mine && showMines) {
      cell.element.textContent = "💣";
      cell.element.classList.add("revealed", "mine");
    } else if (cell.mine) {
      cell.element.textContent = "💣";
      cell.element.classList.add("revealed");
    } else if (!cell.revealed && !cell.flagged) {
      cell.element.classList.add("revealed");
      if (cell.adjacent > 0) {
        cell.element.textContent = cell.adjacent;
        cell.element.classList.add(`n${cell.adjacent}`);
      }
    }
  }
}

resetButton.addEventListener("click", createBoard);

createBoard();
