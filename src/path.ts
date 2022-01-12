import { PlayerColor } from "./pieces";
import { Board } from "./index";

/*
const getRow = (position: number) => {};
const getColumn = (position: number) => {};
const getDiagonal = (position: number) => {};
*/
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
