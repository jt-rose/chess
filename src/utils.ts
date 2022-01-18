import { Board, ChessPieceWithIndex, updateBoard } from ".";
import { MovementOptions } from "./path";
import { PlayerColor } from "./pieces";

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

const convertMovementOptionsToArray = (mo: MovementOptions): number[] => {
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

// map out possible board updates after all possible moves
export const mapPossibleMoves = (offensiveColor: PlayerColor, board: Board) => {
  // get pieces of same color
  const pieces = getPiecesOfSameColor(offensiveColor, board);

  // map out possible movement options by piece
  const movementOptionsByPiece = pieces.map((p) => ({
    ...p,
    movementOptions: convertMovementOptionsToArray(
      p.getMovementOptions({ position: p.index, color: p.color, board })
    ),
  }));

  // for each possible movement position of each piece, map out the board updates that would ensue
  const possibleBoardUpdates = movementOptionsByPiece
    .map((piece) => {
      return piece.movementOptions.map((mo) =>
        updateBoard(piece.index, mo, board)
      );
    })
    .flat()
    .flat();

  // return possible board outcomes
  return possibleBoardUpdates;
};
