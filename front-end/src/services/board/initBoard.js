export default function initBoard(width = 6, height = 6) {
    const Board = require('@sabaki/go-board')

    const boardTable = new Array(height).fill(0).map(() => new Array(width).fill(0))
    let board = new Board(boardTable)
    return board;
}

export function getVertex(x, y) {
    return [y, x];
}