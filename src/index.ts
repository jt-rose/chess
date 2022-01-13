import {
  PlayerColor,
  ChessPieces,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
  Pawn,
} from "./pieces";
import { findRightMoves } from "./path";

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

const moveKing = (position: number, color: PlayerColor) => {
  // define all possible current movement paths
  const topMove = position - 8;
  const rightMove = position + 1;
  const bottomMove = position + 8;
  const leftMove = position - 1;

  let moves = [];
  if (topMove > 0) {
    moves.push(topMove);
  }
  if (bottomMove <= 63) {
    moves.push(bottomMove);
  }

  if (hasSameRow(position, rightMove)) {
    moves.push(rightMove);
  }

  if (hasSameRow(position, leftMove)) {
    moves.push(leftMove);
  }

  return moves.filter(
    (movePosition) =>
      board[movePosition] === null || board[movePosition]?.color !== color
  );
};

const moveQueen = (position: number, color: PlayerColor) => {
  // define directional limits of movement range
  const topMoveLimit = 0 + (position % 8);
  const rightMoveLimit = (position % 8) + 7;
  const bottomMoveLimit = 54 + (position % 8);
  const leftMoveLimit = position - (position % 8);

  // declare variables to store possible moves
  let topMoves: number[] = [];
  const rightMoves = findRightMoves({
    board,
    currentPosition: position,
    color,
    rightMoveLimit,
  });
  let bottommMoves: number[] = [];
  let leftMoves: number[] = [];

  // starting from current position, check each directional step
  // toward the movement limits and store all possible moves in that direction
};
