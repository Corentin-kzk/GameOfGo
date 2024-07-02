import './style.css';
import { getVertex } from '../../services/board/initBoard';
import { whiteMove, blackMove } from '../../services/board/playersActions';
import { useState } from 'react';
import { loadProblem, problemsDataExample as data, resolveProblem } from '../../services/board/solving';

const GogFrame = (tsumego) => {

    console.log(tsumego);
    const [board, setBoard] = useState(loadProblem(data.SZ, data.AB, data.AW));

    function handleBoard(board, vertex) {
        const Board = require('@sabaki/go-board')

        //Check if the case is already filled with a token. If so, stop re-render to prevent the player from changing the token.
        if (board.get([vertex[0], vertex[1]]) !== 0) {
            console.log('Invalid move');
            return;
        }

        //Verify if the current Tsumego require the token to be black of white to complete the puzzle.
        if (data.SOL[0][0] === 'B') {
            const table = blackMove(board, vertex);
            setBoard(new Board(table.signMap));
        } else {
            const table = whiteMove(board, vertex);
            setBoard(new Board(table.signMap));
        }

        //Finally, if the token is placed in the correct position, the player wins the game. Else, it display an error message.
        resolveProblem(data.SOL, vertex) === true ? console.log('Correct') : console.log('Incorrect');
    }

    return (
        <div style={{border:'1px solid black', display:'flex', flexDirection:'column', width:'fit-content'}}>
            {
                board.signMap.map((row, i) => (
                    <div className='row' key={i}>
                        {row.map((cell, j) => (
                            <div className="cell" key={j}>
                                <button id={i+" "+j} onClick={(e) => handleBoard(board, getVertex(i, j))}>
                                    {cell === 0 ? "" : <img src={cell === 1 ? "/imgs/whitePawn.svg" : "/imgs/blackPawn.svg"} alt="Pawn" />}
                                </button>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}

export default GogFrame;