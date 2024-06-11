import React from 'react';
import GogFrame from '../../components/GogFrame/GogFrame';
import { showData } from '../../services/board/solving';


const Gamepage = () => {
    showData();
    return (
        <div>
            <h1>Game of Go</h1>
            <GogFrame />
        </div>
    );
};

export default Gamepage;