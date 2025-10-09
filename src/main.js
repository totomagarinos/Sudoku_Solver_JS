import {
  createBoard,
  getBoardValues,
  displaySolution,
  autoCompleteBoard,
} from "./board";
import { solveSudoku } from "./solver";

document.getElementById("solve-button").addEventListener("click", () => {
  const board = getBoardValues();
  if (solveSudoku(board)) {
    displaySolution(board);
  } else {
    console.log("No tiene solucion");
  }
});

document
  .getElementById("auto-complete-button")
  .addEventListener("click", autoCompleteBoard);

createBoard();
