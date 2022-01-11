export type PlayerColor = "white" | "black";

// set up a generic chess piece class
// the movementOptions and move functions will be overwritten with the unique move instructions
// for each type of chess piece
class ChessPiece {
  position: number;
  alive: boolean;
  color: PlayerColor;
  movementOptions(): number[] {
    return [];
  }
  move(position: number): boolean {
    // const availableSpots = this.movementOptions()
    // if (availableSpots.includes(position)) {
    //    this.position = position
    // }
    // return [];
    console.log(position);
    return false;
  }

  constructor(position: number, color: PlayerColor) {
    this.position = position;
    this.color = color;
    this.alive = true; // defaults to true
  }
}

class King extends ChessPiece {
  constructor(position: number, color: PlayerColor) {
    super(position, color);
  }
}

class Queen extends ChessPiece {
  constructor(position: number, color: PlayerColor) {
    super(position, color);
  }
}
class Bishop extends ChessPiece {
  constructor(position: number, color: PlayerColor) {
    super(position, color);
  }
}
class Knight extends ChessPiece {
  constructor(position: number, color: PlayerColor) {
    super(position, color);
  }
}

class Rook extends ChessPiece {
  constructor(position: number, color: PlayerColor) {
    super(position, color);
  }
}

class Pawn extends ChessPiece {
  constructor(position: number, color: PlayerColor) {
    super(position, color);
  }
}

type ChessPieces = King | Queen | Bishop | Knight | Rook | Pawn;
/*
export let boardSpaces: ChessPieces | null[] = [];

for (let i = 1; i <= 64; i++) {
  boardSpaces.push(null);
}

const setBoard = () => {};
*/
