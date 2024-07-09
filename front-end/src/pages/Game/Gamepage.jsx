import React from 'react';
import GogFrame from '../../components/GogFrame/GogFrame';
import fetchTsumego, { showData } from '../../services/board/solving';
import '../../index.css';

const Gamepage = () => {
    showData();
    return (
        <div className="main-content" style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
            <h1>Game of Go</h1>
            <GogFrame tsumego={fetchTsumego(Math.random(30))} />
        </div>
    );
};

export default Gamepage;