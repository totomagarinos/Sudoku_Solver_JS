function createBoard() {
  const board = document.getElementById("sudoku-board");
  board.className = "board";

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "cell";
      input.maxLength = "1";
      input.pattern = "[1-9]";
      input.dataset.row = row;
      input.dataset.col = col;
      input.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^1-9]/g, "");
        if (e.target.value) {
          const next = e.target.nextElementSibling;
          if (next) next.focus();
        }
      });
      board.appendChild(input);
    }
  }
}

function getBoardValues() {
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

function displaySolution(solvedBoard) {
  const inputs = document.querySelectorAll(".cell");

  inputs.forEach((input) => {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    input.value = solvedBoard[row][col];
  });

  return solvedBoard;
}

function autoCompleteBoard() {
  const defaultBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  const inputs = document.querySelectorAll(".cell");

  inputs.forEach((input) => {
    const row = input.dataset.row;
    const col = input.dataset.col;
    const value = defaultBoard[row][col];

    if (value !== 0) {
      input.value = value;
    } else {
      input.value = "";
    }
  });
}

export { createBoard, getBoardValues, displaySolution, autoCompleteBoard };
