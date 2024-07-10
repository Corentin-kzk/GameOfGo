import './style.css';
import { getVertex } from '../../services/board/initBoard';
import { whiteMove, blackMove } from '../../services/board/playersActions';
import { useState } from 'react';
import { loadProblem, resolveProblem } from '../../services/board/solving';
import { useQuery } from "react-query";
import { getTsumego, getTsumegoById } from "../../services/api/tsumego";
import Board from '@sabaki/go-board'
import { Navigate, useParams } from "react-router-dom";

const GogFrame = () => {
    let { id } = useParams();
    const [board, setBoard] = useState();
    const [tsumegoList, setTsumegoList] = useState();

    const { data, isSuccess, isLoading, isError } = useQuery(
        ['tsumego', id],
        () => getTsumegoById(id),
        {
            onSuccess: (data) => {
                console.log(data)
                setBoard(loadProblem(data.board_size, data.black_stones, data.white_stones));
            },
            enabled: !!id,
        }
    );

    useQuery(
        ['tsumegoList'],
        () => getTsumego(),
        {
            onSuccess: (data) => {
                console.log(data)
                setTsumegoList(data);
            },
            enabled: id === undefined,
        }
    );
    console.log(tsumegoList);

    function handleBoard(board, vertex) {
        //Check if the case is already filled with a token. If so, stop re-render to prevent the player from changing the token.
        if (board.get([vertex[0], vertex[1]]) !== 0) {
            console.log('Invalid move');
            return;
        }

        //Verify if the current Tsumego require the token to be black of white to complete the puzzle.
        if (data.SOL[0][0] === "B") {
            const table = blackMove(board, vertex);
            setBoard(new Board(table.signMap));
        } else {
            const table = whiteMove(board, vertex);
            setBoard(new Board(table.signMap));
        }

        //Finally, if the token is placed in the correct position, the player wins the game. Else, it display an error message.
        resolveProblem(data.SOL, vertex) === true
            ? console.log("Correct")
            : console.log("Incorrect");
    }

    function handleNext() {
        fetch(tsumegoList.next, {
            method: 'GET',
        }).then((response) => console.log(response.json()))
    }

    return (
        <>
            {isSuccess && !!data?.id && <div
                style={{ border: '1px solid black', display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                {
                    board.signMap.map((row, i) => (
                        <div className='row' key={i}>
                            {row.map((cell, j) => (
                                <div className="cell" key={j}>
                                    <button id={i + " " + j} onClick={(e) => handleBoard(board, getVertex(i, j))}>
                                        {cell === 0 ? "" :
                                            <img src={cell === 1 ? "/imgs/whitePawn.svg" : "/imgs/blackPawn.svg"}
                                                alt="Pawn" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>}
            {isLoading && <div
                style={{ border: '1px solid black', display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                Loading
            </div>
            }
            {isError && <div
                style={{ border: '1px solid black', display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                Error
            </div>
            }

            {id === undefined &&
                <div>
                    <h1>Choose a Tsumego</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Problem</th>
                                <th>Difficulty</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tsumegoList?.results.map((tsumego) => (
                            <tr>
                                <td>
                                    Problem n°{tsumego.id}
                                </td>
                                <td>
                                    {tsumego.difficulty == 1 ? "Easy" : tsumego.difficulty == 2 ? "Medium" : "Difficult"}
                                </td>
                                <td>
                                    <button onClick={() => <Navigate to={`/tsumego/${tsumego.id}`} />}>Jouer</button>
                                </td>
                            </tr>
                            ))}
                            <td>
                                <button onClick={() => handleNext()}>Next</button>
                            </td>
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default GogFrame;