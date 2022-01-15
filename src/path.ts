import { PlayerColor } from "./pieces";
import { Board, setBoard } from "./index";

const board = setBoard();

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

const getRightBoundary = (position: number) => {
  return position - (position % 8) + 7;
};

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

const getLeftAndRightSidesOfRow = (position: number) => {
  const row = getRow(position);
  const leftRow = row.filter((rowIndex) => rowIndex < position);
  const rightRow = row.filter((rowIndex) => rowIndex > position);
  return {
    leftRow,
    rightRow,
  };
};

const getColumn = (position: number) => {
  let intermediatePositions: number[] = [];

  for (let i = 0; i < 8; i++) {
    intermediatePositions.push(i * 8 + (position % 8));
  }
  return intermediatePositions;
};

const getBottomAndTopOfColumn = (position: number) => {
  const column = getColumn(position);
  const topColumn = column.filter((columnIndex) => columnIndex < position);
  const bottomColumn = column.filter((columnIndex) => columnIndex > position);

  return {
    topColumn,
    bottomColumn,
  };
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
  return {
    topLeftDiagonals,
    topRightDiagonals,
    bottomLeftDiagonals,
    bottomRightDiagonals,
  };
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
  // get position two places below knight
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

const getKnightRightMovementOptions = (position: number) => {
  // get position two places to the right of knight
  const twoStepsRight = position + 2;

  // if out of bounds, return no positions
  const startingPositionRightBoundary = getRightBoundary(position);
  if (twoStepsRight > startingPositionRightBoundary) {
    return [];
  }

  // get possible steps above and below
  const aboveRight = twoStepsRight - 8;
  const belowRight = twoStepsRight + 8;

  // store viable movement options
  let movementOptions: number[] = [];

  if (aboveRight >= 0) {
    movementOptions.push(aboveRight);
  }

  if (belowRight <= 63) {
    movementOptions.push(belowRight);
  }

  // return movement options
  return movementOptions;
};

const getKnightLeftMovementOptions = (position: number) => {
  // get position two places to the left of knight
  const twoStepsLeft = position - 2;

  // if out of bounds, return no positions
  const startingPositionLeftBoundary = getLeftBoundary(position);
  if (twoStepsLeft < startingPositionLeftBoundary) {
    return [];
  }

  // get possible steps above and below
  const aboveLeft = twoStepsLeft - 8;
  const belowLeft = twoStepsLeft + 8;

  // store viable movement options
  let movementOptions: number[] = [];

  if (aboveLeft >= 0) {
    movementOptions.push(aboveLeft);
  }

  if (belowLeft <= 63) {
    movementOptions.push(belowLeft);
  }

  // return movement options
  return movementOptions;
};

// get all possible knight movement options
const getKnightMovementOptions = (position: number) => {
  // get movement options
  const topMoves = getKnightTopMovementOptions(position);
  const rightMoves = getKnightRightMovementOptions(position);
  const bottomMoves = getKnightBottomMovementOptions(position);
  const leftMoves = getKnightLeftMovementOptions(position);

  return [...topMoves, ...rightMoves, ...bottomMoves, ...leftMoves];
};

/* -------------------------------------------------------------------------- */
/*                 find movement options for each chess piece                 */
/* -------------------------------------------------------------------------- */

const findOtherPieces = (positions: number[], board: Board) => {
  return positions.filter((p) => board[p]);
};

// customize function to find available positions along different axes
type GetNearestPieceFunc = typeof Math.min | typeof Math.max;
type GetInclusivePositions = (
  position: number,
  nearestPiece: number
) => boolean;
const findAvailablePositions =
  (
    getNearestPieceFunc: GetNearestPieceFunc,
    getInclusivePositions: GetInclusivePositions
  ) =>
  (positions: number[], color: PlayerColor, board: Board) => {
    // find other pieces along each axis
    const otherPiecesInPath = findOtherPieces(positions, board);

    // find nearest piece
    const nearestPiece = getNearestPieceFunc(...otherPiecesInPath);

    // if no nearest piece found, accept all positions found
    // if position is on adjacent side of nearest piece remove
    // keep position of nearest piece if it belongs to the opposing player
    const viablePositions = positions.filter(
      (p) =>
        !nearestPiece ||
        //p > nearestPiece ||
        getInclusivePositions(p, nearestPiece) ||
        (p === nearestPiece && board[p]?.color !== color)
    );

    return viablePositions;
  };
const findAvailableLeftPositions = findAvailablePositions(
  Math.max,
  (position, nearestPiece) => position > nearestPiece
);
const findAvailableRightPositions = findAvailablePositions(
  Math.min,
  (position, nearestPiece) => position < nearestPiece
);
const findAvailableBottomPositions = findAvailableRightPositions;
const findAvailableTopPositions = findAvailableLeftPositions;

// These functions will find the movement options for each piece,
// factoring in the curent board and the movement ability of each piece
interface ChessPieceSettings {
  position: number;
  color: PlayerColor;
  board: Board;
}

// const findKingMovementOptions = (
//   chessPieceSettings: ChessPieceSettings
// ): number[] => {

// };

// const findBishopMovementOptions = (
//   chessPieceSettings: ChessPieceSettings
// ): number[] => {
//   const { position, color, board } = chessPieceSettings;

//   // get movement options
//   const {
//     topLeftDiagonals,
//     topRightDiagonals,
//     bottomLeftDiagonals,
//     bottomRightDiagonals,
//   } = getDiagonals(position);
// };

const findKnightMovementOptions = (
  chessPieceSettings: ChessPieceSettings
): number[] => {
  const { position, color, board } = chessPieceSettings;

  // get movement options
  const movementOptions = getKnightMovementOptions(position);

  // remove positions occupied by same color
  const viableMoves = movementOptions.filter(
    (p) => board[p] === null || board[p]?.color !== color
  );

  return viableMoves;
};

const findRookMovementOptions = (
  chessPieceSettings: ChessPieceSettings
): number[] => {
  const { position, color, board } = chessPieceSettings;
  // get row and column movement options
  let { leftRow, rightRow } = getLeftAndRightSidesOfRow(position);
  let { bottomColumn, topColumn } = getBottomAndTopOfColumn(position);

  // get available positions along each axis
  leftRow = findAvailableLeftPositions(leftRow, color, board);
  rightRow = findAvailableRightPositions(rightRow, color, board);
  bottomColumn = findAvailableBottomPositions(bottomColumn, color, board);
  topColumn = findAvailableTopPositions(topColumn, color, board);

  // return all viable movement options
  return [...leftRow, ...rightRow, ...bottomColumn, ...topColumn];
};

// const findPawnMovementOptions = (chessPieceSettings: ChessPieceSettings): number[] => {}

// const findQueenMovementOptions = (chessPieceSettings: ChessPieceSettings): number[] => {
//     // the queen's movement options are a combination of the rook and the bishop
//     // so to simplify things we can just call those functions
//         const axisMovementOptions = findRookMovementOptions(chessPieceSettings)
//         const diagonalMovementOptions = findBishopMovementOptions(chessPieceSettings)

//         return [
//             ...axisMovementOptions,
//             ...diagonalMovementOptions
//         ]
//     }

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
