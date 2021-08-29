// https://github.com/snerks/react-mui-reversi-ts/blob/master/src/services/GameBoardService.ts
import {
    boardScoresDistribute,
    cellIndexRankMap as cellsScoreMap,
} from "../util/utilBoard";
import { IGameMove } from "./GameBoard/GameBoard";
import { chessStatus } from "./types";
export const indexToCoord = (indexOfList: number) => {
    const column = indexOfList % 8;
    const row = (indexOfList - column) / 8;
    return { row, column };
};

export const getHeuristicValue = (
    boardState: chessStatus[],
    currentPlayerIsWhite: boolean
): number => {
    const currentPlayerCellIndices = boardState.map((item, index) => {
        if (item === undefined) {
            return -1;
        }

        if (item !== currentPlayerIsWhite) {
            return index;
        }
        return -1;
    });

    const currentPlayerPopulatedCellIndices = currentPlayerCellIndices.filter(
        (itemIndex) => itemIndex > -1
    );

    const reducer = (accumulator: number, currentValue: number) => {
        return accumulator + boardScoresDistribute[currentValue];
    };

    const result = currentPlayerPopulatedCellIndices.reduce(reducer, 0);

    return result;
};
export const noFunctionCall = () => {};
// https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning
export const alphabeta = (
    board: chessStatus[],
    depth: number,
    alpha: number,
    beta: number,
    whitePlayer: boolean
): number => {
    const availableIndex = getAvailableIndex(board, whitePlayer);
    const haveNoValidMoves = availableIndex.length === 0;

    if (depth === 0 || haveNoValidMoves) {
        return getHeuristicValue(board, whitePlayer);
    }

    let heuristicValue = 0;

    if (whitePlayer) {
        heuristicValue = -Infinity;

        for (let validCellIndex of availableIndex) {
            const nextBoardState = getNextBoard(
                board,
                whitePlayer,
                validCellIndex
            );
            heuristicValue = getHeuristicValue(board, whitePlayer);

            heuristicValue = Math.max(
                heuristicValue,
                alphabeta(nextBoardState, depth - 1, alpha, beta, false)
            );

            const nextAlpha = Math.max(alpha, heuristicValue);

            if (nextAlpha >= beta) {
                break;
            }
        }

        return heuristicValue;
    } else {
        heuristicValue = Infinity;
        for (let aIndex of availableIndex) {
            const nextBoardState = getNextBoard(board, whitePlayer, aIndex);
            heuristicValue = getHeuristicValue(board, whitePlayer);

            heuristicValue = Math.min(
                heuristicValue,
                alphabeta(nextBoardState, depth - 1, alpha, beta, true)
            );

            const nextBeta = Math.min(beta, heuristicValue);

            if (alpha >= nextBeta) {
                break;
            }
        }

        return heuristicValue;
    }
};

export const getNextBoard = (
    boardState: chessStatus[],
    currentPlayerIsWhite: boolean,
    boardPlacedCellIndex: number
): chessStatus[] => {
    const capturedCellIndices = getClickedCellIndex(
        boardState,
        currentPlayerIsWhite,
        boardPlacedCellIndex
    );

    const nextBoard: chessStatus[] = [];

    for (let i = 0; i < boardState.length; i++) {
        if (i === boardPlacedCellIndex) {
            nextBoard.push(currentPlayerIsWhite);
        } else {
            const currentGameCellIsWhiteStatus = boardState[i];

            if (capturedCellIndices.indexOf(i) > -1) {
                nextBoard.push(currentPlayerIsWhite);
            } else {
                nextBoard.push(currentGameCellIsWhiteStatus);
            }
        }
    }
    return nextBoard;
};

export const getReplayedBoardState = (
    boardState: chessStatus[],
    gameMoves: IGameMove[]
): chessStatus[] => {
    let nextBoardState: chessStatus[] = boardState;

    for (let gameMove of gameMoves) {
        nextBoardState = getNextBoard(
            nextBoardState,
            gameMove.whitePlayer,
            gameMove.clickedCellIndex
        );
    }

    return nextBoardState;
};

export interface CellRankAndIndex {
    index: number;
    rank: number;
}

export const getCellRank = (cellIndex: number): CellRankAndIndex => {
    if (cellsScoreMap.has(cellIndex)) {
        const rank = cellsScoreMap.get(cellIndex);

        if (rank === undefined) {
            return {
                index: cellIndex,
                rank: 3,
            };
        }

        return {
            index: cellIndex,
            rank,
        };
    }

    return {
        index: cellIndex,
        rank: 3,
    };
};

export function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
export interface CellStatusAndIndex {
    index: number;
    status: chessStatus;
}

export interface CellLine {
    items: CellStatusAndIndex[];
}

interface Coord {
    row: number;
    col: number;
}

export const getCoordinates = (index: number): Coord => {
    const col = index % 8;
    const row = (index - col) / 8;
    return {
        row: row,
        col: col,
    };
};

export const getCellIndex = (row: number, col: number) => {
    return row * 8 + col;
};

const getNeighCondition = (
    board: chessStatus[],
    rowIndex: number,
    columnIndex: number,
    rowOffest: number,
    columnOffset: number
): CellStatusAndIndex | null => {
    const rowChoices = rowIndex + rowOffest;
    const ColumnChoices = columnIndex + columnOffset;
    const rowGood = rowChoices > -1 && rowChoices < 8;
    const colGood = ColumnChoices > -1 && ColumnChoices < 8;
    const coordGood = rowGood && colGood;

    if (!coordGood) {
        return null;
    }

    const candidateCellLineItemIndex = getCellIndex(rowChoices, ColumnChoices);

    const candidateCellLineItemIsWhiteStatus =
        board[candidateCellLineItemIndex];

    return {
        status: candidateCellLineItemIsWhiteStatus,
        index: candidateCellLineItemIndex,
    };
};

const getNeighCell = (
    board: chessStatus[],
    col: number,
    row: number,
    rowOffest: number,
    columnOffset: number
): CellLine => {
    const result: CellLine = {
        items: [],
    };

    let currentRowIndex = row;
    let currentColumnIndex = col;

    let NeighCondition: CellStatusAndIndex | null;

    do {
        NeighCondition = getNeighCondition(
            board,
            currentRowIndex,
            currentColumnIndex,
            rowOffest,
            columnOffset
        );

        if (NeighCondition) {
            result.items.push(NeighCondition);

            currentRowIndex += rowOffest;
            currentColumnIndex += columnOffset;
        }
    } while (!!NeighCondition);

    return result;
};

export const getNeighbourCells = (
    boardState: chessStatus[],
    row: number,
    col: number
): CellLine[] => {
    const results: CellLine[] = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i !== 0 || j !== 0) {
                results.push(getNeighCell(boardState, row, col, i, j));
            }
        }
    }

    return results;
};

export const getClickedCellIndex = (
    board: chessStatus[],
    whitePlayer: boolean,
    index: number
): number[] => {
    let results: number[] = [];
    const { row, col } = getCoordinates(index);
    const aroundCells = getNeighbourCells(board, row, col);

    for (let neighbourCell of aroundCells) {
        if (neighbourCell.items.length) {
            let NeighOppoCount = 0;
            const NeighOppoCells: number[] = [];

            for (let i = 0; i < neighbourCell.items.length; i++) {
                let neighCondition = neighbourCell.items[i];

                let neighWhite = neighCondition.status;
                let neighPopulated = neighWhite !== undefined;

                if (!neighPopulated) {
                    break;
                }

                let neighIsOpponent = whitePlayer ? !neighWhite : neighWhite;

                if (neighIsOpponent) {
                    NeighOppoCount++;
                    NeighOppoCells.push(neighCondition.index);
                } else {
                    if (NeighOppoCount > 0) {
                        results = [...results, ...NeighOppoCells];
                    }
                    break;
                }
            }
        }
    }

    return results;
};

export const getAvailableIndex = (
    board: chessStatus[],
    whitePlayer: boolean
) => {
    const cellStatusAndIndexItems = board.map(
        (cellWhite: chessStatus, index: number): CellStatusAndIndex => {
            const isEmptyCell = cellWhite === undefined;

            if (isEmptyCell) {
                return {
                    status: cellWhite,
                    index,
                };
            }

            return {
                status: cellWhite,
                index: -1,
            };
        }
    );

    const emptyCellStatusAndIndexItems = cellStatusAndIndexItems.filter(
        (emptyCell) => emptyCell.index > -1
    );

    const emptyNeighOppo: CellStatusAndIndex[] = [];

    for (let emptyCellStatusAndIndexItem of emptyCellStatusAndIndexItems) {
        const column = emptyCellStatusAndIndexItem.index % 8;
        const row = (emptyCellStatusAndIndexItem.index - column) / 8;

        const neighbourcells = getNeighbourCells(board, row, column);

        for (let neighCell of neighbourcells) {
            if (neighCell.items.length) {
                let neighOppoCount = 0;

                for (let i = 0; i < neighCell.items.length; i++) {
                    const currNeighCondition = neighCell.items[i];

                    const neighWhite = currNeighCondition.status;
                    const neighPopulate = neighWhite !== undefined;

                    if (!neighPopulate) {
                        break;
                    }

                    const neighIsOppo =
                        neighPopulate && whitePlayer ? !neighWhite : neighWhite;

                    if (neighIsOppo) {
                        neighOppoCount++;
                    } else {
                        if (neighOppoCount > 0) {
                            emptyNeighOppo.push(emptyCellStatusAndIndexItem);
                        }

                        break;
                    }
                }
            }
        }
    }

    return emptyNeighOppo.map((emptyCell) => emptyCell.index);
};
