export default function searchPlayersVertex(board) {
    let playersVertex = {
        white: [],
        black: []
    }
    board.signMap.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === 1) {
                playersVertex.white.push([i, j])
            } else if (cell === -1) {
                playersVertex.black.push([i, j])
            }
        })
    })
    return playersVertex;
}