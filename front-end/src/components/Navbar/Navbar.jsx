import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <div>
                    <li><a href="/">Home</a></li>
                    {/* <li><a href="/play">Play</a></li> */}
                </div>
                <div>
                    <li>
                        <button><a href="/login">Sign in</a></button>
                        <button><a href="/signup">Sign up</a></button>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;