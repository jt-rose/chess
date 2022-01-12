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

//const topEdge = [0, 1, 2, 3, 4, 5, 6, 7];
const rightEdge = [7, 15, 23, 31, 39, 47, 55, 63];
//const bottomEdge = [56, 57, 58, 59, 60, 61, 62, 63];
const leftEdge = [0, 8, 16, 24, 32, 40, 48, 56];

/*
const getTopBoundary = (position: number) => {

}
*/

const getRightBoundary = (position: number) => {
  return position - (position % 8) + 7;
};

/*
const getBottomBoundary = (position: number) => {

}
*/
const getLeftBoundary = (position: number) => {
  return position - (position % 8);
};

/* -------------------------------------------------------------------------- */
/*                            get rows and columns                            */
/* -------------------------------------------------------------------------- */

const getRow = (position: number) => {
  const rowStart = getLeftBoundary(position);
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
  const startingPositionLeftEdge = getLeftBoundary(position);
  const startingLeftEdgeIndex = leftEdge.findIndex(
    (i) => i === startingPositionLeftEdge
  );

  const nextStepLeftEdge = leftEdge[startingLeftEdgeIndex - 1];

  // if the next step is out of bounds, return the previously found steps
  if (nextStepLeftEdge === getLeftBoundary(nextStep)) {
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
  const startingPositionLeftEdge = getLeftBoundary(position);
  const startingLeftEdgeIndex = leftEdge.findIndex(
    (i) => i === startingPositionLeftEdge
  );

  const nextStepLeftEdge = leftEdge[startingLeftEdgeIndex + 1];

  // if the next step is out of bounds, return the previously found steps
  if (nextStepLeftEdge === getLeftBoundary(nextStep)) {
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
  const startingPositionRightEdge = getRightBoundary(position);
  const startingRightEdgeIndex = rightEdge.findIndex(
    (i) => i === startingPositionRightEdge
  );
  const nextStepRightEdge = rightEdge[startingRightEdgeIndex - 1];

  // if the next step is out of bounds, return the previously found steps
  if (nextStepRightEdge === getRightBoundary(nextStep)) {
    return getTopRightDiagonals(nextStep, [...diagonalSteps, nextStep]);
  }

  return diagonalSteps;
};

const getBottomRightDiagonals = (
  position: number,
  diagonalSteps: number[] = []
): number[] => {
  const nextStep = position + 9;

  // if next step is out of bounds, return current diagonalSteps
  if (nextStep > 63) {
    return diagonalSteps;
  }

  // check boundary
  const startingPositionRightEdge = getRightBoundary(position);
  const startingRightEdgeIndex = rightEdge.findIndex(
    (i) => i === startingPositionRightEdge
  );
  const nextStepRightEdge = rightEdge[startingRightEdgeIndex + 1];

  // if the next step is out of bounds, return the previously found steps
  if (nextStepRightEdge === getRightBoundary(nextStep)) {
    return getBottomRightDiagonals(nextStep, [...diagonalSteps, nextStep]);
  }

  return diagonalSteps;
};

const getDiagonals = (position: number) => {
  // get diagonal movement options
  const topLeftDiagonals = getTopLeftDiagonals(position);
  const topRightDiagonals = getTopRightDiagonals(position);
  const bottomLeftDiagonals = getBottomLeftDiagonals(position);
  const bottomRightDiagonals = getBottomRightDiagonals(position);

  // return all diagonal movement options
  return [
    ...topLeftDiagonals,
    ...topRightDiagonals,
    ...bottomLeftDiagonals,
    ...bottomRightDiagonals,
  ];
};

/* -------------------------------------------------------------------------- */
/*                    get L-shaped knight movement options                    */
/* -------------------------------------------------------------------------- */

const getKnightTopMovementOptions = (position: number): number[] => {
  // get position two places above knight
  const twoStepsUp = position - 16;

  // if out of bounds, return no positions
  if (twoStepsUp < 0) {
    return [];
  }

  // get left and right boundaries
  const leftBoundary = getLeftBoundary(twoStepsUp);
  const rightBoundary = getRightBoundary(twoStepsUp);

  // get possible steps left and right
  const topRight = twoStepsUp + 1;
  const topLeft = twoStepsUp - 1;

  // store viable movement options
  let movementOptions: number[] = [];

  if (topRight <= rightBoundary) {
    movementOptions.push(topRight);
  }

  if (topLeft >= leftBoundary) {
    movementOptions.push(topLeft);
  }

  // return movement options
  return movementOptions;
};

const getKnightBottomMovementOptions = (position: number) => {
  // get position two places above knight
  const twoStepsDown = position + 16;

  // if out of bounds, return no positions
  if (twoStepsDown > 63) {
    return [];
  }

  // get left and right boundaries
  const leftBoundary = getLeftBoundary(twoStepsDown);
  const rightBoundary = getRightBoundary(twoStepsDown);

  // get possible steps left and right
  const bottomRight = twoStepsDown + 1;
  const bottomLeft = twoStepsDown - 1;

  // store viable movement options
  let movementOptions: number[] = [];

  if (bottomRight <= rightBoundary) {
    movementOptions.push(bottomRight);
  }

  if (bottomLeft >= leftBoundary) {
    movementOptions.push(bottomLeft);
  }

  // return movement options
  return movementOptions;
};

/*
const getKnightMovementOptions = (position: number) => {
  // get top movement options
  const topSteps = position - 16;
  const topRight = topSteps + 1;
  const topLeft = topSteps - 1;

  // check boundary
  //const topBoundary =

  // get bottom movement options
  const bottomSteps = position + 16;
  const bottomRight = bottomSteps + 1;
  const bottomLeft = bottomSteps - 1;

  // get right movement options
  const rightSteps = position + 2;
  const rightTop = rightSteps - 8;
  const rightBottom = rightSteps + 8;

  // get left movement options
  const leftSteps = position - 2;
  const leftTop = leftSteps - 8;
  const leftBottom = leftSteps + 8;
};*/

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
