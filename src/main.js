import {
  createBoard,
  getBoardValues,
  displaySolution,
  autoCompleteBoard,
  isBoardEmpty,
  cleanBoard,
  showMessage,
} from "./board";
import { solveSudoku } from "./solver";

document.getElementById("solveButton").addEventListener("click", () => {
  const board = getBoardValues();

  if (isBoardEmpty(board)) {
    showMessage(
      "El tablero está vacío. Ingresá algunos números antes de resolver.",
      "error",
    );
  } else if (solveSudoku(board)) {
    displaySolution(board);
  } else {
    showMessage("El tablero no tiene solución", "error");
  }
});

document
  .getElementById("autoCompleteButton")
  .addEventListener("click", autoCompleteBoard);

document.getElementById("resetButton").addEventListener("click", cleanBoard);

// document.getElementById("checkButton").addEventListener("click", () => {
//   const board = getBoardValues();
//
//   if (isSolvedCorrectly(board)) {
//     showMessage("Sudoku resuelto correctamente!", "success");
//   } else {
//     showMessage("Sudoku mal resuelto, hay valores no válidos.", "error");
//   }
// });

createBoard();
