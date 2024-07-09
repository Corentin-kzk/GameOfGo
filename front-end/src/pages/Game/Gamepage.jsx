import React from 'react';
import GogFrame from '../../components/GogFrame/GogFrame';
import "../../index.css";

const Gamepage = () => {
    return (
        <div
            className="main-content"
            style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
            <h1>Game of Go</h1>
            <GogFrame/>
        </div>
    );
};

export default Gamepage;
