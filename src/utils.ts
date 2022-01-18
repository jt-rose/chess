import { Board, updateBoard } from "./board";
import { MovementOptions } from "./path";
import { ChessPiece, PlayerColor } from "./pieces";

export interface ChessPieceWithIndex extends ChessPiece {
  index: number;
}

export const getPiecesOfSameColor = (
  color: PlayerColor,
  board: Board
): ChessPieceWithIndex[] => {
  // pick out pieces from board that are on the same side
  let pieces: ChessPieceWithIndex[] = [];
  for (let index = 0; index < board.length; index++) {
    const piece = board[index];
    if (piece && piece.color === color) {
      pieces.push({ ...piece, index });
    }
  }

  return pieces;
};

// convert undefined movement options into empty number array
const convertNumberArray = (nums: number[] | undefined): number[] =>
  nums ? nums : [];

export const convertMovementOptionsToArray = (
  mo: MovementOptions
): number[] => {
  let { top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft } =
    mo;

  // convert undefined values
  top = convertNumberArray(top);
  topRight = convertNumberArray(topRight);
  right = convertNumberArray(right);
  bottomRight = convertNumberArray(bottomRight);
  bottom = convertNumberArray(bottom);
  bottomLeft = convertNumberArray(bottomLeft);
  left = convertNumberArray(left);
  topLeft = convertNumberArray(topLeft);
  return [
    ...top,
    ...topRight,
    ...right,
    ...bottomRight,
    ...bottom,
    ...bottomLeft,
    ...left,
    ...topLeft,
  ];
};

// get the current offensive range for one side
export const getOffensiveRange = (
  offensiveColor: PlayerColor,
  board: Board
) => {
  // pick out pieces from board that are on the same offensive side
  let offensivePieces = getPiecesOfSameColor(offensiveColor, board);

  // get movement options for all offensive pieces
  const offensiveMovementOptions = offensivePieces
    .map((p) =>
      p.getMovementOptions({ position: p.index, color: p.color, board })
    )
    .flatMap((mo) => convertMovementOptionsToArray(mo));

  return offensiveMovementOptions;
};

interface ChessPieceWithMovementOptions extends ChessPieceWithIndex {
  movementOptions: number[];
}

export const mapSinglePiecePossibleMoves = (
  position: number,
  board: Board
): ChessPieceWithMovementOptions | null => {
  const piece = board[position];
  if (piece === null) {
    return null;
  }
  const mo = piece.getMovementOptions({ position, color: piece.color, board });
  const movementOptions = convertMovementOptionsToArray(mo);
  return {
    ...piece,
    index: position,
    movementOptions,
  };
};

// map out possible board updates after all possible moves
export const mapPossibleMoves = (offensiveColor: PlayerColor, board: Board) => {
  // get pieces of same color
  const pieces = getPiecesOfSameColor(offensiveColor, board);

  // map out possible movement options by piece
  let movementOptionsByPiece: ChessPieceWithMovementOptions[] = [];
  for (const piece of pieces) {
    if (piece !== null) {
      const movementOptions = mapSinglePiecePossibleMoves(piece.index, board);
      if (movementOptions !== null) {
        movementOptionsByPiece.push(movementOptions);
      }
    }
  }

  // for each possible movement position of each piece, map out the board updates that would ensue
  const possibleBoardUpdates = movementOptionsByPiece
    .map((piece) => {
      return piece.movementOptions.map((mo) =>
        updateBoard(piece.index, mo, board)
      );
    })
    .flat();

  // return possible board outcomes
  return possibleBoardUpdates;
};

// find king's position
export const findKingPosition = (color: PlayerColor, board: Board) =>
  board.findIndex((piece) => piece?.name === "king" && piece.color === color);

export const getOppositeColor = (color: PlayerColor): PlayerColor =>
  color === "black" ? "white" : "black";
