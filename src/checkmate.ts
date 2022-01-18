import { Board } from "./board";
import { PlayerColor } from "./pieces";
import { getOffensiveRange } from "./utils";

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
const checkMate = () => {
  // find movement positions of offensiveColor
  // find defending king's position
  // check if king's position can be reached by the offensive color's movement options
  // if reachable, find all possible movement options for the king's color
  // then model how the board will change for every scenario
  // and then rerun the check for each to see if the king is still in check
  // if he is, checkmate!
  // if not, then it is only check and he may still escape
};
// enpassant
