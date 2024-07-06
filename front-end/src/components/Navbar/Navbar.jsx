import React from 'react';
import './Navbar.css';

const Navbar = () => {
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav>
            <ul>
                <div>
                    <li><a href="/">Home</a></li>
                    {/* <li><a href="/play">Play</a></li> */}
                </div>
                <div>
                    <li>
                        <button><a href="/login">Login</a></button>
                        <button><a href="/signup">Signup</a></button>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
