import { isSolvedCorrectly } from "./solver";

export function createBoard() {
  const board = document.getElementById("board");

  let savedBoard;
  try {
    savedBoard = JSON.parse(localStorage.getItem("sudokuBoard"));
  } catch (e) {
    savedBoard = null;
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "cell";
      input.maxLength = "1";
      input.pattern = "[1-9]";
      input.dataset.row = row;
      input.dataset.col = col;

      if (savedBoard && savedBoard[row][col]) {
        input.value = savedBoard[row][col];
        input.classList.add("fixed");
      }

      input.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^1-9]/g, "");
        const value = e.target.value;
        const rowIdx = parseInt(input.dataset.row);
        const colIdx = parseInt(input.dataset.col);

        if (value) {
          const board = getBoardValues();

          if (!numberIsValid(board, rowIdx, colIdx, value)) {
            input.classList.add("invalid");
          } else {
            input.classList.remove("invalid");
            const next = e.target.nextElementSibling;
            if (next) next.focus();
          }

          localStorage.setItem("sudokuBoard", JSON.stringify(board));

          const allFilled = Array.from(
            document.querySelectorAll(".cell")
          ).every((input) => input.value !== "");

          if (allFilled) {
            const board = getBoardValues();
            if (isSolvedCorrectly(board)) {
              showMessage("Sudoku resuelto correctamente!", "success");
            } else {
              showMessage("Hay errores en el Sudoku", "error");
            }
          }
        }
      });
      board.appendChild(input);
    }
  }
}

export function isBoardEmpty(board) {
  return board.flat().every((cell) => cell === 0);
}

export function numberIsValid(board, row, col, number) {
  const num = Number(number);

  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c] === num) return false;
  }

  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col] === num) return false;
  }

  const rowStart = Math.floor(row / 3) * 3;
  const colStart = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = rowStart + i;
      const c = colStart + j;
      if ((r !== row || c !== col) && board[r][c] === num) return false;
    }
  }

  return true;
}

export function getBoardValues() {
  const boardArray = Array.from({ length: 9 }, () => Array(9).fill(0));
  const inputs = document.querySelectorAll(".cell");

  inputs.forEach((input) => {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    const value = input.value;
    boardArray[row][col] = value === "" ? 0 : parseInt(value);
  });

  return boardArray;
}

export function displaySolution(solvedBoard) {
  const inputs = document.querySelectorAll(".cell");

  inputs.forEach((input) => {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    input.value = solvedBoard[row][col];
  });

  showMessage("Sudoku resuelto!", "success");

  return solvedBoard;
}

export function loadExample(difficulty) {
  const sudokuBoards = {
    facil: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    medio: [
      [0, 0, 0, 6, 0, 0, 4, 0, 0],
      [7, 0, 0, 0, 0, 3, 6, 0, 0],
      [0, 0, 0, 0, 9, 1, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 0, 1, 8, 0, 0, 0, 3],
      [0, 0, 0, 3, 0, 6, 0, 4, 5],
      [0, 4, 0, 2, 0, 0, 0, 6, 0],
      [9, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 1, 0, 0],
    ],
    dificil: [
      [0, 0, 0, 0, 0, 0, 0, 1, 2],
      [0, 0, 0, 0, 3, 5, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 7, 0],
      [7, 0, 0, 0, 0, 0, 3, 0, 0],
      [0, 0, 0, 4, 0, 0, 8, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0, 0],
      [0, 8, 0, 0, 0, 0, 0, 4, 0],
      [0, 5, 0, 0, 0, 0, 6, 0, 0],
    ],
  };

  const defaultBoard = sudokuBoards[difficulty];
  const inputs = document.querySelectorAll(".cell");

  inputs.forEach((input) => {
    const row = input.dataset.row;
    const col = input.dataset.col;
    const value = defaultBoard[row][col];

    if (value !== 0) {
      input.value = value;
      input.classList.add("fixed");
      input.readOnly = true;
    } else {
      input.value = "";
      input.classList.remove("fixed");
      input.readOnly = false;
    }
  });

  showMessage("Tablero cargado", "info");
}

export function cleanBoard() {
  const inputs = document.querySelectorAll(".cell");

  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("fixed");
    input.classList.remove("invalid");
  });

  localStorage.removeItem("sudokuBoard");
  showMessage("Tablero limpiado", "info");
}

export function showMessage(text, type) {
  const msg = document.getElementById("statusMessage");
  msg.textContent = text;
  msg.className = `status-message ${type} show`;

  setTimeout(() => {
    msg.classList.remove("show");
  }, [3000]);
}
