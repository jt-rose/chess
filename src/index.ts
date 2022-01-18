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
