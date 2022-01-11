export type PlayerColor = "white" | "black";

// set up a generic chess piece class
// the movementOptions and move functions will be overwritten with the unique move instructions
// for each type of chess piece
export class ChessPiece {
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
  }
}

export class King extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}

export class Queen extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}
export class Bishop extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}
export class Knight extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}

export class Rook extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}

export class Pawn extends ChessPiece {
  constructor(color: PlayerColor) {
    super(color);
  }
}

// set up general type for pieces
export type ChessPieces = King | Queen | Bishop | Knight | Rook | Pawn;
