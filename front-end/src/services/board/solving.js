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

export function showData() {
    console.log(problemsDataExample);
}

export function loadProblem(size, blackStones, whiteStones, player) {
    const Board = require('@sabaki/go-board');
    const boardTable = new Array(size).fill(0).map(() => new Array(size).fill(0));
    let board = new Board(boardTable);

    blackStones.forEach(stone => board.set(stone, -1));
    whiteStones.forEach(stone => board.set(stone, 1));

    return board;
}

export function resolveProblem(solution, vertex) {
    console.log(solution.SOL[0][1], vertex);
    if (solution.SOL[0][1][0] === vertex[0] && solution.SOL[0][1][1] === vertex[1]) {
        alert(solution.SOL[0][2]);
        window.location.href('/solved');
    } else {
        alert('RATÉ!');
    }
}