export const problemsDataExample = {
    "AB": [
        [
            4,
            1
        ],
        [
            5,
            1
        ],
        [
            1,
            2
        ],
        [
            2,
            2
        ],
        [
            3,
            2
        ],
        [
            1,
            4
        ]
    ],
    "AW": [
        [
            3,
            0
        ],
        [
            0,
            1
        ],
        [
            1,
            1
        ],
        [
            2,
            1
        ],
        [
            3,
            1
        ]
    ],
    "SZ": 19,
    "C": "Black to play: Elementary",
    "SOL": [
        [
            "B",
            [
                1,
                0
            ],
            "Correct.",
            ""
        ]
    ]
};

export default async function fetchTsumego(randomId = 1) {
    await fetch(`http://localhost:8000/api/tsumego/`)
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
        return data.results;
    })
    .catch(error => console.error(error));
}

fetchTsumego();

export function showData() {
    console.log(problemsDataExample);
}

export function loadProblem(size, blackStones, whiteStones) {
    const Board = require('@sabaki/go-board');
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