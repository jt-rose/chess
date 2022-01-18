import { MovementOptions } from "./path";
import {
  PlayerColor,
  ChessPieces,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
  Pawn,
  ChessPiece,
} from "./pieces";
import { getOffensiveRange, getPiecesOfSameColor } from "./utils";

// build out starting board of 64 spots with no pieces set
export type Board = (ChessPieces | null)[];

// fill the empty board with pieces in their starting positions
export const setBoard = (): Board => {
  let board: Board = [];
  for (let i = 0; i < 64; i++) {
    board.push(null);
  }
  // set up blacks
  board[0] = new Rook("black");
  board[1] = new Knight("black");
  board[2] = new Bishop("black");
  board[3] = new Queen("black");
  board[4] = new King("black");
  board[5] = new Bishop("black");
  board[6] = new Knight("black");
  board[7] = new Rook("black");

  // set up black pawns
  for (let i = 8; i < 16; i++) {
    board[i] = new Pawn("black");
  }

  // set up empty spaces - useful for resetting the board for a new game
  for (let i = 16; i < 48; i++) {
    board[i] = null;
  }
  // set up white pawns
  for (let i = 48; i < 56; i++) {
    board[i] = new Pawn("white");
  }

  // set up whites
  board[56] = new Rook("white");
  board[57] = new Knight("white");
  board[58] = new Bishop("white");
  board[59] = new Queen("white");
  board[60] = new King("white");
  board[61] = new Bishop("white");
  board[62] = new Knight("white");
  board[63] = new Rook("white");

  return board;
};

const board = setBoard();
console.log(board);
// console.log(board.length);

const hasSameRow = (originalPosition: number, newPosition: number) => {
  if (newPosition < 0 || newPosition > 63) {
    return false;
  }
  const leftBoundary = originalPosition - (originalPosition % 8);
  const newPositionLeftBoundary = newPosition - (newPosition % 8);
  return leftBoundary === newPositionLeftBoundary;
};

export const updateBoard = (
  oldPosition: number,
  newPosition: number,
  board: Board
) => {
  // store the piece that's moving
  const piece = board[oldPosition];

  // clear out the old position of the piece on the board
  board[oldPosition] = null;

  // move the piece to the new position and remove any position that had been there
  board[newPosition] = piece;

  // transform pawn into queen if reaching other side of the board
  if (
    piece?.color === "black" &&
    piece.name === "pawn" &&
    [56, 57, 58, 59, 60, 61, 62, 63].includes(newPosition)
  ) {
    const newQueen = new Queen("black");
    board[newPosition] = newQueen;
  }
  if (
    piece?.color === "white" &&
    piece.name === "pawn" &&
    [0, 1, 2, 3, 4, 5, 6, 7].includes(newPosition)
  ) {
    const newQueen = new Queen("white");
    board[newPosition] = newQueen;
  }

  // return updated board
  return board;
};

export interface ChessPieceWithIndex extends ChessPiece {
  index: number;
}

// get offensive range and see if opposing king is in danger
const putKingInCheck = (offensiveColor: PlayerColor, board: Board): boolean => {
  const offensiveMovementOptions = getOffensiveRange(offensiveColor, board);

  // pick out position of defending king
  const kingPosition = board.findIndex(
    (p) => p?.name === "king" && p.color !== offensiveColor
  );

  // check if king is within range of attack
  const isKingInDanger = offensiveMovementOptions.includes(kingPosition);

  return isKingInDanger;
};

// offensive options can change if king or other pieces defeat attacking pieces
// or even just move in the way
const checkMate = () => {};
// enpassant
