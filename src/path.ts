import { PlayerColor } from "./pieces";
import { Board } from "./index";

/* -------------------------------------------------------------------------- */
/*                             map out board edges                            */
/* -------------------------------------------------------------------------- */
/*
*Board Indexes:
[
    0,1,2,3,4,5,6,7,
    8,9,10,11,12,13,14,15,
    16,17,18,19,20,21,22,23,
    24,25,26,27,28,29,30,31,
    32,33,34,35,36,37,38,39,
    40,41,42,43,44,45,46,47,
    48,49,50,51,52,53,54,55,
    56,57,58,59,60,61,62,63
]
*/

const topEdge = [0, 1, 2, 3, 4, 5, 6, 7];
const rightEdge = [7, 15, 23, 31, 39, 47, 55, 63];
const bottomEdge = [56, 57, 58, 59, 60, 61, 62, 63];
const leftEdge = [0, 8, 16, 24, 32, 40, 48, 56];

/* -------------------------------------------------------------------------- */
/*                            get rows and columns                            */
/* -------------------------------------------------------------------------- */

const getRow = (position: number) => {
  const rowStart = position - (position % 8);
  const rowEnd = rowStart + 7;
  let intermediatePositions: number[] = [];

  for (let i = rowStart + 1; i < rowEnd; i++) {
    intermediatePositions.push(i);
  }

  return [rowStart, ...intermediatePositions, rowEnd];
};

const getColumn = (position: number) => {
  let intermediatePositions: number[] = [];

  for (let i = 0; i < 8; i++) {
    intermediatePositions.push(i * 8 + (position % 8));
  }
  return intermediatePositions;
};

/* -------------------------------------------------------------------------- */
/*                             calculate diagonals                            */
/* -------------------------------------------------------------------------- */

const getTopLeftDiagonals = (
  position: number,
  diagonalSteps: number[] = []
): number[] => {
  const nextStep = position - 9;

  // if next step is out of bounds, return current diagonalSteps
  if (nextStep < 0) {
    return diagonalSteps;
  }

  // check boundary
  const startingPositionLeftEdge = position - (position % 8);
  const startingLeftEdgeIndex = leftEdge.findIndex(
    (i) => i === startingPositionLeftEdge
  );

  const nextStepLeftEdge = leftEdge[startingLeftEdgeIndex - 1];

  // if the next step is out of bounds, return the previously found steps
  if (nextStepLeftEdge === nextStep - (nextStep % 8)) {
    return getTopLeftDiagonals(nextStep, [...diagonalSteps, nextStep]);
  }

  return diagonalSteps;
};

const getBottomLeftDiagonals = (
  position: number,
  diagonalSteps: number[] = []
): number[] => {
  const nextStep = position + 7;

  // if next step is out of bounds, return current diagonalSteps
  if (nextStep > 63) {
    return diagonalSteps;
  }

  // check boundary
  const startingPositionLeftEdge = position - (position % 8);
  const startingLeftEdgeIndex = leftEdge.findIndex(
    (i) => i === startingPositionLeftEdge
  );

  const nextStepLeftEdge = leftEdge[startingLeftEdgeIndex + 1];

  // if the next step is out of bounds, return the previously found steps
  if (nextStepLeftEdge === nextStep - (nextStep % 8)) {
    return getBottomLeftDiagonals(nextStep, [...diagonalSteps, nextStep]);
  }

  return diagonalSteps;
};

const getTopRightDiagonals = (
  position: number,
  diagonalSteps: number[] = []
): number[] => {
  const nextStep = position - 7;

  // if next step is out of bounds, return current diagonalSteps
  if (nextStep < 0) {
    return diagonalSteps;
  }

  // check boundary
  const startingPositionRightEdge = position - (position % 8) + 7;
  const startingRightEdgeIndex = rightEdge.findIndex(
    (i) => i === startingPositionRightEdge
  );
  const nextStepRightEdge = rightEdge[startingRightEdgeIndex - 1];

  // if the next step is out of bounds, return the previously found steps
  if (nextStepRightEdge === nextStep - (nextStep % 8) + 7) {
    return getTopRightDiagonals(nextStep, [...diagonalSteps, nextStep]);
  }

  return diagonalSteps;
};

const getDiagonals = (position: number) => {
  const forwardStep = position + 1;
  const backstep = position - 1;

  const topLeftDiagonal = backstep - 8;
  const topRightDiagonal = forwardStep - 8;
  const bottomLeftDiagonal = backstep + 8;
  const bottomRightDiagonal = forwardStep + 8;
};

/* -------------------------------------------------------------------------- */
/*                     find new positions to right of unit                    */
/* -------------------------------------------------------------------------- */

export const findRightMoves = (
  config: {
    board: Board;
    currentPosition: number;
    color: PlayerColor;
    rightMoveLimit: number;
  },
  viableMoves: number[] = []
): number[] => {
  const { board, currentPosition, color, rightMoveLimit } = config;
  const newPosition = currentPosition + 1;
  if (newPosition > rightMoveLimit) {
    return viableMoves;
  }

  const boardPosition = board[newPosition];
  if (boardPosition?.color === color) {
    return viableMoves;
  }

  return findRightMoves(
    {
      board,
      currentPosition: newPosition,
      color,
      rightMoveLimit,
    },
    [...viableMoves, newPosition]
  );
};
