import { Board, ChessPieceWithIndex } from ".";
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
