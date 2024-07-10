import Board from "@sabaki/go-board";
export function loadProblem(size, blackStones, whiteStones) {
  const boardTable = new Array(size).fill(0).map(() => new Array(size).fill(0));
  let board = new Board(boardTable);

  blackStones.forEach(stone => board.set(stone, -1));
  whiteStones.forEach(stone => board.set(stone, 1));

  return board;
}

export function resolveProblem(solution, vertex) {
  console.log(solution[0][1], vertex);
  if (solution[0][1][0] === vertex[0] && solution[0][1][1] === vertex[1]) {
    return true;
  } else {
    return false;
  }
}
