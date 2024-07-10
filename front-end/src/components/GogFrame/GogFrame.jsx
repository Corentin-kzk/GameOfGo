import "./style.css";
import { getVertex } from "../../services/board/initBoard";
import { whiteMove, blackMove } from "../../services/board/playersActions";
import { useContext, useState } from "react";
import { loadProblem, resolveProblem } from "../../services/board/solving";
import { useMutation, useQuery } from "react-query";
import {
  getTsumego,
  getTsumegoById,
  postTsumegoResutl
} from "../../services/api/tsumego";
import Board from "@sabaki/go-board";
import {  useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { Alert, Snackbar } from "@mui/material";
import {queryClient} from "../../index";
import './style.css';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const GogFrame = () => {
  let { id } = useParams();
  const { user } = useContext(AuthContext);
  const [board, setBoard] = useState();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(null);
  const [snackBarStatus, setSnackBarStatus] = useState(false);

  const navigate = useNavigate();

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["tsumego", id],
    () => getTsumegoById(id),
    {
      onSuccess: data => {
        console.log(data);
        setBoard(
          loadProblem(data.board_size, data.black_stones, data.white_stones)
        );
      },
      enabled: !!id
    }
  );

  const { data: tsumegoList } = useQuery(
    ["tsumegoList", page],
    () => getTsumego(page),
    {
      enabled: id === undefined
    }
  );

  const gameMutation = useMutation("gameResult", postTsumegoResutl, {
    onSuccess: gameResult => {
      setStatus(gameResult.solved);
      setSnackBarStatus(true);
      queryClient.invalidateQueries('tsumego')
    }
  });
  function handleBoard(board, vertex) {
    const formatResponse = solution => {
      return JSON.parse(solution.replace(/'/g, '"'));
    };

    let sol = formatResponse(data.solution);

    //Check if the case is already filled with a token. If so, stop re-render to prevent the player from changing the token.
    if (board.get([vertex[0], vertex[1]]) !== 0) {
      console.log("Invalid move");
      return;
    }

    //Verify if the current Tsumego require the token to be black of white to complete the puzzle.
    if (sol[0][0] === "B") {
      const table = blackMove(board, vertex);
      setBoard(new Board(table.signMap));
    } else {
      const table = whiteMove(board, vertex);
      setBoard(new Board(table.signMap));
    }

    //Finally, if the token is placed in the correct position, the player wins the game. Else, it display an error message.
    const stat = resolveProblem(sol, vertex);
    setStatus(stat);
    const date = new Date(Date.now());
    if (stat !== null)
      gameMutation.mutate({
        user: user.id,
        tsumego: data?.id,
        solved: stat,
        solved_date: date.toISOString()
      });
  }

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrevious = () => {
    setPage(page - 1);
  };

  return (
    <>
      {isSuccess && !!data?.id && id && (
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            width: "fit-content"
          }}
        >
          {board.signMap.map((row, i) => (
            <div className="row" key={i}>
              {row.map((cell, j) => (
                <div className="cell" key={j}>
                  <button
                    id={i + " " + j}
                    onClick={e => handleBoard(board, getVertex(i, j))}
                  >
                    {cell === 0 ? (
                      ""
                    ) : (
                      <img
                        src={
                          cell === 1
                            ? "/imgs/whitePawn.svg"
                            : "/imgs/blackPawn.svg"
                        }
                        alt="Pawn"
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {isLoading && (
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            width: "fit-content"
          }}
        >
          Loading
        </div>
      )}
      {isError && (
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            width: "fit-content"
          }}
        >
          Error
        </div>
      )}

            {id === undefined &&
                <div>
                    <h1>Choose a Tsumego</h1>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Problem</TableCell>
                                    <TableCell>Difficulty</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tsumegoList?.results.map((tsumego) => (
                                    <TableRow key={tsumego.id}>
                                        <TableCell>Problem n°{tsumego.id}</TableCell>
                                        <TableCell>
                                            {tsumego.difficulty === 1 ? "Easy" : tsumego.difficulty === 2 ? "Medium" : "Difficult"}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="success" onClick={() => navigate(`/play/${tsumego.id}`)}>Play</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {page >= 2 &&
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <Button variant="contained" onClick={handlePrevious}>Previous</Button>
                                        </TableCell>
                                    </TableRow>
                                }
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Button variant="contained" onClick={handleNext}>Next</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
             <Snackbar open={snackBarStatus} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={() => setSnackBarStatus(false)}
          severity={status ? "success" : "error"}
          sx={{ width: "100%" }}
          variant="filled"
        >
          <div>{status ? "Success" : "Fail"}</div>
        </Alert>
      </Snackbar>
        </>
    )
}

export default GogFrame;
