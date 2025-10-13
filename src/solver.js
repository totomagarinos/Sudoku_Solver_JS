export function findEmpty(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

export function isValid(board, row, col, number) {
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === number) return false;
  }

  for (let r = 0; r < 9; r++) {
    if (board[r][col] === number) return false;
  }

  const rowStart = Math.floor(row / 3) * 3;
  const colStart = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[rowStart + i][colStart + j] === number) {
        return false;
      }
    }
  }

  return true;
}

export function solveSudoku(board) {
  const emptyCell = findEmpty(board);

  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;

  for (let number = 1; number <= 9; number++) {
    if (isValid(board, row, col, number)) {
      board[row][col] = number;

      if (solveSudoku(board)) {
        return true;
      }

      board[row][col] = 0;
    }
  }

  return false;
}

export function isSolvedCorrectly(board) {
  const emptyCell = findEmpty(board);

  if (emptyCell) {
    return false;
  }

  for (let row = 0; row < 9; row++) {
    const nums = new Set();
    for (let col = 0; col < 9; col++) {
      const value = board[row][col];

      if (nums.has(value)) return false;
      nums.add(value);
    }
  }

  for (let col = 0; col < 9; col++) {
    const nums = new Set();
    for (let row = 0; row < 9; row++) {
      const value = board[row][col];

      if (nums.has(value)) return false;
      nums.add(value);
    }
  }

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const nums = new Set();

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const row = boxRow * 3 + i;
          const col = boxCol * 3 + j;
          const value = board[row][col];
          if (nums.has(value)) return false;
          nums.add(value);
        }
      }
    }
  }

  return true;
}
