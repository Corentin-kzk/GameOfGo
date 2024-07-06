import React from 'react';
import './Homepage.css';

function Homepage() {
    return (
        <>
            <div className='containerPlay'>
                <h1>Welcome to the Game of Go!</h1>
                <div className='text'>
                    <p>Go is a board game for two players that originated in China more than 2,500 years ago. The game is rich in strategy despite its simple rules.</p>
                    <p>It has been claimed that Go is the most complex game in the world due to its vast number of possible positions and its long history.</p>
                </div>

                <div className='text'>
                    <h2>How to play</h2>
                    <p>Players take turns placing stones on the board, trying to capture the opponent's stones or surround empty areas to make points.</p>
                </div>
                <a href="/play"><button>Start Game</button></a>
            </div>
        </>
    );
}

export default Homepage;