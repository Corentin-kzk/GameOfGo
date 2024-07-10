import React, { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext";
import { useQuery } from 'react-query';
import { getTsumegoByUser } from '../../services/api/tsumego';

const User = () => {
    const { user } = useContext(AuthContext);
    const { data } = useQuery(
        ['tsumego-user'],
        () => getTsumegoByUser(user?.id),
        {
            onSuccess: (data) => {
                console.log(data)
            },
        }
    );

    console.log(user);

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h1>User Profile</h1>
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            {/* Add more user information here */}
        </div>
    );
};

export default User;