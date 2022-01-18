import {
  findPawnMovementOptions,
  findKingMovementOptions,
  findQueenMovementOptions,
  findRookMovementOptions,
  findBishopMovementOptions,
  findKnightMovementOptions,
  MovementOptions,
  ChessPieceSettings,
} from "./path";

export type PlayerColor = "white" | "black";
export type NameOfChessPiece =
  | "king"
  | "queen"
  | "bishop"
  | "knight"
  | "rook"
  | "pawn"
  | "_PLACEHOLDER_";

// set up a generic chess piece class
// the movementOptions and move functions will be overwritten with the unique move instructions
// for each type of chess piece
export class ChessPiece {
  name: NameOfChessPiece;
  color: PlayerColor;
  getMovementOptions(chessPieceSettings: ChessPieceSettings): MovementOptions {
    return {};
  }
  /*move(position: number): boolean {
    // const availableSpots = this.movementOptions()
    // if (availableSpots.includes(position)) {
    // }
    // return [];
    console.log(position);
    return false;
  }*/

  constructor(color: PlayerColor) {
    this.color = color;
    this.name = "_PLACEHOLDER_";
  }
}

export class King extends ChessPiece {
  getMovementOptions = findKingMovementOptions;
  constructor(color: PlayerColor) {
    super(color);
    this.name = "king";
  }
}

export class Queen extends ChessPiece {
  getMovementOptions = findQueenMovementOptions;
  constructor(color: PlayerColor) {
    super(color);
    this.name = "queen";
  }
}
export class Bishop extends ChessPiece {
  getMovementOptions = findBishopMovementOptions;
  constructor(color: PlayerColor) {
    super(color);
    this.name = "bishop";
  }
}
export class Knight extends ChessPiece {
  getMovementOptions = findKnightMovementOptions;
  constructor(color: PlayerColor) {
    super(color);
    this.name = "knight";
  }
}

export class Rook extends ChessPiece {
  getMovementOptions = findRookMovementOptions;
  constructor(color: PlayerColor) {
    super(color);
    this.name = "rook";
  }
}

export class Pawn extends ChessPiece {
  getMovementOptions = findPawnMovementOptions;
  constructor(color: PlayerColor) {
    super(color);
    this.name = "pawn";
  }
}

// set up general type for pieces
export type ChessPieces = King | Queen | Bishop | Knight | Rook | Pawn;
