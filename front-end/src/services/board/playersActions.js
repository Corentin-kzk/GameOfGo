export default function switchPlayer(player) {
    return player === 1 ? -1 : 1;
}

export function whiteMove(board, vertex) {
    board.set(vertex, 1);
    return board
}