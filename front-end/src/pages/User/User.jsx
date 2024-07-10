import React, { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext";
import { useQuery } from 'react-query';
import { getTsumegoByUser } from '../../services/api/tsumego';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const User = () => {
    const navigate = useNavigate();
    let resolveProblems = 0

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

    for (let i = 0; i < data?.length; i++) {
        if (data[i].solved === true) {
            resolveProblems++
        }   
    }
    console.log(user);
    console.log(data);

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <h1>{user?.username}</h1>
            <p>Resolved Tsumego: {resolveProblems}</p>

            <TableContainer sx={{maxWidth: 650, marginTop: '2em'}} component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Problem</TableCell>
                            <TableCell>Resolved</TableCell>
                            <TableCell>Attempt</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data?.map(tsumego => (
                        <TableRow
                        key={tsumego.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{fontSize: '1.2em'}} component="th" scope="row">
                                Problem n°{tsumego.tsumego}
                            </TableCell>
                            {tsumego.solved ? <TableCell sx={{color:'green', fontSize: '0.8em'}}>Yes</TableCell> : <TableCell sx={{color:'red', fontSize: '0.8em'}}>No</TableCell>}
                            <TableCell sx={{fontSize: '1.2em'}}>{new Date(tsumego.solved_date).toLocaleDateString()}</TableCell>
                            <TableCell align="right">
                                <button style={{border: '1px black solid', borderRadius: '5px'}} onClick={() => navigate(`/play/${tsumego.tsumego}`)}>
                                    Replay
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default User;