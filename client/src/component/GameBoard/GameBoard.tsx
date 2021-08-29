// https://github.com/snerks/react-mui-reversi-ts/blob/master/src/components/GameBoardList.tsx
import React, { useState, useEffect } from "react";
import {
    GridList,
    GridListTile,
    Grid,
    BottomNavigation,
    BottomNavigationAction,
} from "@material-ui/core";
import RestorePageIcon from "@material-ui/icons/RestorePage";
import UndoIcon from "@material-ui/icons/Undo";
import {
    getClickedCellIndex,
    getCellIndex,
    getAvailableIndex as getAvailableCells,
    getNextBoard,
    alphabeta,
    getReplayedBoardState,
    indexToCoord,
    getAvailableIndex,
    getCoordinates,
    sleep,
    noFunctionCall,
} from "../GameHandler";
import { chessStatus } from "../types";
import GameOver from "../GameOver/GameOver";
import Cell from "../Cell/Cell";
import { initialChessBoard } from "../../util/utilBoard";
import { themeColors } from "../../util/colors";
import { useStyles } from "./GameBoard.style";
import SentimentVeryDissatisfied from "@material-ui/icons/SentimentVeryDissatisfied";
import ResultBar from "./ResultBar";
import { handleResultSubmit } from "./handler";

interface IGameBoardProps {
    initialBoard: chessStatus[];
}

export interface IGameMove {
    whitePlayer: boolean;
    clickedCellIndex: number;
}

const GameBoard = ({ initialBoard }: IGameBoardProps) => {
    const styles = useStyles();
    const [cellNumbers] = useState(Array.from(initialBoard).map((e, i) => i));
    const [board, setBoard] = useState(initialBoard);
    const [whitePlayer, setWhitePlayer] = useState(false);
    const [passCount, setPassCount] = useState(0);
    const [gameMoves, setGameMoves] = useState<IGameMove[]>([]);
    const emptyCells = board.filter((item) => item === undefined);
    const isGameOver = emptyCells.length === 0 || passCount > 1;
    const whiteCells = board.filter((item) => item !== undefined && item);
    const blackCells = board.filter((item) => item !== undefined && !item);
    let result: string = "";
    const [submit, setSubmit] = useState(true);

    const getComputedCell = () => {
        const availableCells = getAvailableIndex(board, whitePlayer);

        if (availableCells.length === 0) {
            pass();
            return;
        }

        let alpha = -Infinity;
        const beta = Infinity;

        let validCellIndexOrNull: number | null = null;

        for (let validCellIndex of availableCells) {
            const next = getNextBoard(board, whitePlayer, validCellIndex);
            const nextAlpha = alphabeta(next, 3, alpha, beta, false);
            if (nextAlpha > alpha) {
                alpha = nextAlpha;
                validCellIndexOrNull = validCellIndex;
            }
        }

        if (validCellIndexOrNull === null) {
            pass();
            return;
        }

        const { row, column } = indexToCoord(validCellIndexOrNull);
        handleClick(row, column);
    };

    useEffect(() => {
        if (isGameOver && submit) {
            handleResultSubmit(blackCells.length);
            setSubmit(false);
        }
        if (whitePlayer) {
            sleep(600).then(() => {
                getComputedCell();
            });
        }
        // eslint-disable-next-line
    }, [whitePlayer]);

    const handleClick = (row: number, column: number) => {
        const clickedCellIndex = getCellIndex(row, column);
        const capturedCellIndices = getClickedCellIndex(
            board,
            whitePlayer,
            clickedCellIndex
        );

        const nextBoard: chessStatus[] = [];

        for (let i = 0; i < board.length; i++) {
            if (i === clickedCellIndex) {
                nextBoard.push(whitePlayer);
            } else {
                if (capturedCellIndices.indexOf(i) >= 0) {
                    nextBoard.push(whitePlayer);
                } else {
                    nextBoard.push(board[i]);
                }
            }
        }

        setBoard(nextBoard);
        setWhitePlayer(!whitePlayer);
        setPassCount(0);
        setGameMoves([
            ...gameMoves,
            {
                whitePlayer: whitePlayer,
                clickedCellIndex: clickedCellIndex,
            },
        ]);
    };

    const restart = () => {
        setBoard(initialChessBoard);
        setGameMoves([]);
        setWhitePlayer(false);
        setPassCount(0);
    };

    const pass = () => {
        setWhitePlayer(!whitePlayer);
        setPassCount(passCount + 1);
    };

    const undo = () => {
        if (gameMoves.length === 0) {
            return;
        }

        const nextMoves = [...gameMoves];
        let lastMove = null;
        let isUndoComplete = false;

        do {
            lastMove = nextMoves[nextMoves.length - 1];
            nextMoves.pop();
            if (!lastMove.whitePlayer) {
                isUndoComplete = true;
            }
        } while (!isUndoComplete && nextMoves.length > 0);

        const nextBoardState = getReplayedBoardState(initialBoard, nextMoves);
        setBoard(nextBoardState);
        setGameMoves(nextMoves);
        setWhitePlayer(whitePlayer);
    };
    if (isGameOver) {
        if (whiteCells.length === blackCells.length) {
            result = "It was a Draw!!!";
        } else {
            result =
                whiteCells.length > blackCells.length
                    ? "Winner is White(AI) !"
                    : "Winner is Black(YOU) ";
        }
    }

    const validCells = getAvailableCells(board, whitePlayer);

    const showResult = (
        <div className={styles.scoreSpace}>
            <ResultBar
                whiteScore={whiteCells.length}
                blackScore={blackCells.length}
            />
            {isGameOver && (
                <Grid
                    item
                    container
                    alignItems="center"
                    alignContent="space-between"
                >
                    <Grid item xs={1} sm={2} />
                    <Grid item xs={10} sm={8} container>
                        <Grid container justify="center">
                            <div style={{ fontSize: "14px" }}>
                                <span color={themeColors.white}>{result}</span>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} sm={2} />
                </Grid>
            )}
            {isGameOver && passCount > 1 && (
                <Grid item container>
                    <Grid item xs={1} sm={2} />
                    <Grid
                        item
                        xs={10}
                        sm={8}
                        alignItems="center"
                        alignContent="space-between"
                        container
                    >
                        <Grid container justify="center">
                            <div style={{ fontSize: "14px" }}>
                                <span>The game is done due to Pass</span>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} sm={2} />
                </Grid>
            )}
        </div>
    );

    return (
        <div className={styles.root}>
            <br />
            <BottomNavigation
                value={null}
                onChange={(e, choice) => {
                    switch (choice) {
                        case "Restart":
                            restart();
                            break;
                        case "Pass":
                            pass();
                            break;
                        case "Undo":
                            undo();
                            break;
                        default:
                            console.log("No such choice exists!");
                            break;
                    }
                }}
                showLabels
                className={styles.root}
            >
                <BottomNavigationAction
                    label="Restart"
                    value="Restart"
                    icon={<RestorePageIcon />}
                />

                {!isGameOver && validCells.length === 0 && (
                    <BottomNavigationAction
                        label="You have to PASS!!!Please click me!"
                        value="Pass"
                        icon={<SentimentVeryDissatisfied />}
                    />
                )}

                {!isGameOver && gameMoves.length > 0 && (
                    <BottomNavigationAction
                        label="Undo"
                        value="Undo"
                        icon={<UndoIcon />}
                    />
                )}
            </BottomNavigation>

            <br />
            <GridList cols={8} cellHeight="auto">
                {cellNumbers.map((cellNumber) => {
                    const { row, col } = getCoordinates(cellNumber);
                    const isValid = validCells.indexOf(cellNumber) >= 0;

                    return (
                        <GridListTile
                            key={cellNumber}
                            cols={1}
                            style={{
                                cursor: isValid ? "grab" : "not-allowed",
                            }}
                        >
                            <div className={styles.cell}>
                                <Cell
                                    row={row}
                                    column={col}
                                    isWhite={board[cellNumber]}
                                    handleClick={
                                        isValid ? handleClick : noFunctionCall
                                    }
                                    isValid={isValid}
                                    playerWhite={whitePlayer}
                                />
                            </div>
                        </GridListTile>
                    );
                })}
            </GridList>

            <br />
            {showResult}
            {isGameOver && <GameOver message={result} restart={restart} />}
            {!isGameOver && !whitePlayer && passCount > 0 && (
                <GameOver message={`Computer has passed!`} />
            )}
        </div>
    );
};

export default GameBoard;
