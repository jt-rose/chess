import { Board } from "./board";
import {
  PlayerColor,
  //ChessPieces,
  //Rook,
  //Knight,
  //Bishop,
  Queen,
  //King,
  //Pawn,
  ChessPiece,
} from "./pieces";
import { getOffensiveRange } from "./utils";

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
