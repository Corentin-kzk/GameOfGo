import React from 'react';
import GogFrame from '../../components/GogFrame/GogFrame';
import fetchTsumego, { showData } from '../../services/board/solving';


const Gamepage = () => {
    showData();
    return (
        <div>
            <h1>Game of Go</h1>
            <GogFrame tsumego={fetchTsumego()} />
        </div>
    );
};

export default Gamepage;