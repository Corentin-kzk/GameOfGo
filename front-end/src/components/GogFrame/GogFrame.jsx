import './style.css';
import { getVertex } from '../../services/board/initBoard';
import { whiteMove, blackMove } from '../../services/board/playersActions';
import { useState} from 'react';
import { loadProblem, resolveProblem } from '../../services/board/solving';
import {isError, useQuery} from "react-query";
import {getTsumegoById} from "../../services/api/tsumego";
import Board from '@sabaki/go-board'
import {useParams} from "react-router-dom";

const GogFrame = () => {
    let { id } = useParams();
    const [board, setBoard] = useState();
    const {data, isSuccess, isLoading, isError } = useQuery(
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

    console.log(data)


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

    return (
        <>
            {isSuccess && !!data?.id &&<div
                style={{border: '1px solid black', display: 'flex', flexDirection: 'column', width: 'fit-content'}}>
                {
                    board.signMap.map((row, i) => (
                        <div className='row' key={i}>
                            {row.map((cell, j) => (
                                <div className="cell" key={j}>
                                    <button id={i + " " + j} onClick={(e) => handleBoard(board, getVertex(i, j))}>
                                        {cell === 0 ? "" :
                                            <img src={cell === 1 ? "/imgs/whitePawn.svg" : "/imgs/blackPawn.svg"}
                                                 alt="Pawn"/>}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>}
             {isLoading && <div
                style={{border: '1px solid black', display: 'flex', flexDirection: 'column', width: 'fit-content'}}>
                            Loading
                        </div>
                        }
                        {isError && <div
                style={{border: '1px solid black', display: 'flex', flexDirection: 'column', width: 'fit-content'}}>
                            Error
                        </div>
                        }

        </>
    )
}

export default GogFrame;