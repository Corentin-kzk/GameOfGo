import React from 'react';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/play">Play</a></li>
                <li>
                    <button><a href="/login">Sign in</a></button>
                    <button><a href="/signup">Sign up</a></button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;