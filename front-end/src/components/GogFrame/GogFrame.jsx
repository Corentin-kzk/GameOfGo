import './style.css';
import initBoard, { getVertex } from '../../services/board/initBoard';
import { whiteMove } from '../../services/board/playersActions';
import { useState } from 'react';

const GogFrame = () => {
    const [board, setBoard] = useState(initBoard());

    function handleBoard(board, vertex) {
        const Board = require('@sabaki/go-board')
        const table = whiteMove(board, vertex);
        setBoard(new Board(table.signMap));
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