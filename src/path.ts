import { ChessPiece, PlayerColor } from "./pieces";
import { Board, setBoard } from "./index";

const board = setBoard();

/* -------------------------------------------------------------------------- */
/*                         movement options interface                         */
/* -------------------------------------------------------------------------- */

interface MovementOptions {
  top?: number[];
  topRight?: number[];
  right?: number[];
  bottomRight?: number[];
  bottom?: number[];
  bottomLeft?: number[];
  left?: number[];
  topLeft?: number[];
}

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
const getKnightMovementOptions = (position: number): MovementOptions => {
  // get movement options
  const top = getKnightTopMovementOptions(position);
  const right = getKnightRightMovementOptions(position);
  const bottom = getKnightBottomMovementOptions(position);
  const left = getKnightLeftMovementOptions(position);

  return {
    top,
    right,
    bottom,
    left,
  };
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

const findKingMovementOptions = (
  chessPieceSettings: ChessPieceSettings
): MovementOptions => {
  const { position, color, board } = chessPieceSettings;

  // get possible movements
  const top = position - 8;
  const right = position + 1;
  const bottom = position + 8;
  const left = position - 1;

  // check if movements are out of bounds or occupied by piece of the same color
  const invalidTopMovement = top < 0 || board[top]?.color === color;

  const invalidRightMovement =
    right > getRightBoundary(position) || board[right]?.color === color;

  const invalidBottomMovement = bottom > 63 || board[bottom]?.color === color;

  const invalidLeftMovement =
    left < getLeftBoundary(position) || board[left]?.color === color;

  // return valid moves
  return {
    top: !invalidTopMovement ? [top] : undefined,
    right: !invalidRightMovement ? [right] : undefined,
    bottom: !invalidBottomMovement ? [bottom] : undefined,
    left: !invalidLeftMovement ? [left] : undefined,
  };
};

const findBishopMovementOptions = (
  chessPieceSettings: ChessPieceSettings
): MovementOptions => {
  const { position, color, board } = chessPieceSettings;

  // get movement options
  let {
    topLeftDiagonals,
    topRightDiagonals,
    bottomLeftDiagonals,
    bottomRightDiagonals,
  } = getDiagonals(position);

  // find first position in each diagonal
  // that has another piece, or return undefined
  // diagonals are returned in the order they branch out
  // from the original piece's position, so the first one found
  // will be the first in the path
  const topLeftPieceIndex = topLeftDiagonals.find((p) => board[p] !== null);
  const topRightPieceIndex = topRightDiagonals.find((p) => board[p] !== null);
  const bottomLeftPieceIndex = bottomLeftDiagonals.find(
    (p) => board[p] !== null
  );
  const bottomRightPieceIndex = bottomRightDiagonals.find(
    (p) => board[p] !== null
  );

  // if piece found, determine if it has the same color
  // if same color, remove that piece's position and all after
  // if opposite color, keep that position but remove all after

  // calculate viable topLeft movement options
  if (topLeftPieceIndex) {
    if (board[topLeftPieceIndex]?.color !== color) {
      // remove positions less than index found
      topLeftDiagonals = topLeftDiagonals.filter((x) => x >= topLeftPieceIndex);
    } else {
      // remove positions at and less than index found
      topLeftDiagonals = topLeftDiagonals.filter((x) => x > topLeftPieceIndex);
    }
  }

  // calculate viable topRight movement options
  if (topRightPieceIndex) {
    if (board[topRightPieceIndex]?.color !== color) {
      // remove positions less than index found
      topRightDiagonals = topRightDiagonals.filter(
        (x) => x >= topRightPieceIndex
      );
    } else {
      // remove positions at and less than index found
      topRightDiagonals = topRightDiagonals.filter(
        (x) => x > topRightPieceIndex
      );
    }
  }

  // calculate viable bottomLeft movement options
  if (bottomLeftPieceIndex) {
    if (board[bottomLeftPieceIndex]?.color !== color) {
      // remove positions less than index found
      bottomLeftDiagonals = bottomLeftDiagonals.filter(
        (x) => x <= bottomLeftPieceIndex
      );
    } else {
      // remove positions at and less than index found
      bottomLeftDiagonals = bottomLeftDiagonals.filter(
        (x) => x < bottomLeftPieceIndex
      );
    }
  }

  // calculate viable bottomRight movement options
  if (bottomRightPieceIndex) {
    if (board[bottomRightPieceIndex]?.color !== color) {
      // remove positions greater than index found
      bottomRightDiagonals = bottomRightDiagonals.filter(
        (x) => x <= bottomRightPieceIndex
      );
    } else {
      // remove positions at and less than than index found
      bottomRightDiagonals = bottomRightDiagonals.filter(
        (x) => x < bottomRightPieceIndex
      );
    }
  }

  return {
    topLeft: topLeftDiagonals,
    topRight: topRightDiagonals,
    bottomLeft: bottomLeftDiagonals,
    bottomRight: bottomRightDiagonals,
  };
};

const removePositionsHeldBySameColor = (config: {
  positions?: number[];
  color: PlayerColor;
  board: Board;
}) => {
  const { positions, color, board } = config;
  if (!positions) {
    return undefined;
  }
  return positions.filter(
    (p) => board[p] === null || board[p]?.color !== color
  );
};

const findKnightMovementOptions = (
  chessPieceSettings: ChessPieceSettings
): MovementOptions => {
  const { position, color, board } = chessPieceSettings;

  // get movement options
  let { top, right, bottom, left } = getKnightMovementOptions(position);

  // remove positions occupied by same color
  top = removePositionsHeldBySameColor({ positions: top, color, board });
  right = removePositionsHeldBySameColor({ positions: right, color, board });
  bottom = removePositionsHeldBySameColor({ positions: bottom, color, board });
  left = removePositionsHeldBySameColor({ positions: left, color, board });

  return {
    top,
    right,
    bottom,
    left,
  };
};

const findRookMovementOptions = (
  chessPieceSettings: ChessPieceSettings
): MovementOptions => {
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
  return {
    top: topColumn,
    right: rightRow,
    bottom: bottomColumn,
    left: leftRow,
  };
};

const findQueenMovementOptions = (
  chessPieceSettings: ChessPieceSettings
): MovementOptions => {
  // the queen's movement options are a combination of the rook and the bishop
  // so to simplify things we can just call those functions
  const axisMoves = findRookMovementOptions(chessPieceSettings);
  const diagonalMoves = findBishopMovementOptions(chessPieceSettings);

  return {
    ...axisMoves,
    ...diagonalMoves,
  };
};

const findPawnMovementOptions = (
  chessPieceSettings: ChessPieceSettings
): MovementOptions => {
  const { position, color, board } = chessPieceSettings;

  // calculate next possible movements
  const blackStartingLine = [8, 9, 10, 11, 12, 13, 14, 15];
  const whiteStartingLine = [48, 49, 50, 51, 52, 53, 54, 55];

  if (color === "black") {
    const bottom = position + 8;
    // the bottomDoubleStep refers to the first move where the pawn can move two spaces
    const bottomDoubleStep = position + 16;
    const bottomRight = position + 9;
    const bottomLeft = position + 7;

    // if on starting position, black can move two spaces forward
    const validBottomMovement = bottom < 63 && board[bottom] === null;
    const validBottomDoubleStep =
      validBottomMovement &&
      blackStartingLine.includes(position) &&
      bottomDoubleStep < 63 &&
      board[bottomDoubleStep] === null;
    const validBottomRightMovement =
      bottomRight <= getRightBoundary(bottom) &&
      board[bottomRight]?.color === "white";
    const validBottomLeftMovement =
      bottomLeft >= getLeftBoundary(bottom) &&
      board[bottomRight]?.color === "white";

    let bottomMovements: number[] = [];
    if (validBottomMovement) {
      bottomMovements.push(bottom);
      if (validBottomDoubleStep) {
        bottomMovements.push(bottomDoubleStep);
      }
    }

    return {
      bottom: bottomMovements.length ? bottomMovements : undefined,
      bottomRight: validBottomRightMovement ? [bottomRight] : undefined,
      bottomLeft: validBottomLeftMovement ? [bottomLeft] : undefined,
    };
  } else {
    const top = position - 8;
    // the bottomDoubleStep refers to the first move where the pawn can move two spaces
    const topDoubleStep = position - 16;
    const topRight = position - 7;
    const topLeft = position - 9;

    // if on starting position, black can move two spaces forward
    const validTopMovement = top >= 0 && board[top] === null;
    const validTopDoubleStep =
      validTopMovement &&
      whiteStartingLine.includes(position) &&
      topDoubleStep >= 0 &&
      board[topDoubleStep] === null;
    const validTopRightMovement =
      topRight <= getRightBoundary(top) && board[topRight]?.color === "black";
    const validTopLeftMovement =
      topLeft >= getLeftBoundary(top) && board[topLeft]?.color === "black";

    let topMovements: number[] = [];
    if (validTopMovement) {
      topMovements.push(top);
      if (validTopDoubleStep) {
        topMovements.push(topDoubleStep);
      }
    }
    return {
      top: topMovements.length ? topMovements : undefined,
      topRight: validTopRightMovement ? [topRight] : undefined,
      topLeft: validTopLeftMovement ? [topLeft] : undefined,
    };
  }
};
