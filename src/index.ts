export type PlayerColor = "white" | "black";

// set up a generic chess piece class
// the movementOptions and move functions will be overwritten with the unique move instructions
// for each type of chess piece
class ChessPiece {
  alive: boolean;
  color: PlayerColor;
  movementOptions(): number[] {
    return [];
  }
  move(position: number): boolean {
    // const availableSpots = this.movementOptions()
    // if (availableSpots.includes(position)) {
    // }
    // return [];
    console.log(position);
    return false;
  }

  constructor(color: PlayerColor) {
    this.color = color;
    this.alive = true; // defaults to true
  }
}

class King extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}

class Queen extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}
class Bishop extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}
class Knight extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}

class Rook extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}

class Pawn extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}

// set up general type for pieces
type ChessPieces = King | Queen | Bishop | Knight | Rook | Pawn;

// build out starting board with no pieces
let boardSpaces: (ChessPieces | null)[] = [];
for (let i = 1; i <= 64; i++) {
  boardSpaces.push(null);
}
/*

const setBoard = () => {
  // set up whites
  // set up blacks
};
*/
