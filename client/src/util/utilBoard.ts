import { chessStatus } from "../component/types";
// https://github.com/snerks/react-mui-reversi-ts/blob/master/src/services/GameBoardService.ts

export const initialChessBoard: chessStatus[] = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    true,
    false,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    false,
    true,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
];

// https://stackoverflow.com/questions/40166357/python-reversi-othello-ai-working-under-1-second
export const boardScoresDistribute = [
    100, -8, 8, 6, 6, 8, -8, 100, -8, -24, -4, -3, -3, -4, -24, -8, 8, -4, 7, 4,
    4, 7, -4, 8, 6, -3, 4, 0, 0, 4, -3, 6, 6, -3, 4, 0, 0, 4, -3, 6, 8, -4, 7,
    4, 4, 7, -4, 8, -8, -24, -4, -3, -3, -4, -24, -8, 100, -8, 8, 6, 6, 8, -8,
    100,
];

export const cellIndexRankMap = new Map<number, number>();

// Corner
cellIndexRankMap.set(0, 6);
cellIndexRankMap.set(7, 6);
cellIndexRankMap.set(56, 6);
cellIndexRankMap.set(63, 6);

// Inner Edges
cellIndexRankMap.set(2, 5);
cellIndexRankMap.set(3, 5);
cellIndexRankMap.set(4, 5);
cellIndexRankMap.set(5, 5);

cellIndexRankMap.set(16, 5);
cellIndexRankMap.set(24, 5);
cellIndexRankMap.set(32, 5);
cellIndexRankMap.set(40, 5);

cellIndexRankMap.set(23, 5);
cellIndexRankMap.set(31, 5);
cellIndexRankMap.set(39, 5);
cellIndexRankMap.set(47, 5);

cellIndexRankMap.set(57, 5);
cellIndexRankMap.set(58, 5);
cellIndexRankMap.set(59, 5);
cellIndexRankMap.set(60, 5);

// Inner corners
cellIndexRankMap.set(18, 4);
cellIndexRankMap.set(21, 4);
cellIndexRankMap.set(42, 4);
cellIndexRankMap.set(45, 4);

// Others
// Rank === 3

// C Cells
cellIndexRankMap.set(1, 2);
cellIndexRankMap.set(6, 2);
cellIndexRankMap.set(8, 2);
cellIndexRankMap.set(15, 2);

cellIndexRankMap.set(48, 2);
cellIndexRankMap.set(55, 2);
cellIndexRankMap.set(57, 2);
cellIndexRankMap.set(62, 2);

// X Cells
cellIndexRankMap.set(9, 1);
cellIndexRankMap.set(14, 1);
cellIndexRankMap.set(49, 1);
cellIndexRankMap.set(54, 1);
