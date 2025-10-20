import {
  createBoard,
  getBoardValues,
  displaySolution,
  isBoardEmpty,
  cleanBoard,
  showMessage,
  loadExample,
} from "./board";
import { solveSudoku } from "./solver";

document.getElementById("solveButton").addEventListener("click", () => {
  const board = getBoardValues();

  if (isBoardEmpty(board)) {
    showMessage(
      "El tablero está vacío. Ingresá algunos números antes de resolver.",
      "error"
    );
  } else if (solveSudoku(board)) {
    displaySolution(board);
  } else {
    showMessage("El tablero no tiene solución", "error");
  }
});

document
  .getElementById("loadExampleButton")
  .addEventListener("change", (event) => {
    loadExample(event.target.value);
  });

document.getElementById("resetButton").addEventListener("click", cleanBoard);

createBoard();
