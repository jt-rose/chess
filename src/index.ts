export type PlayerColor = "white" | "black";

export let boardSpaces: number[] = [];

for (let i = 1; i <= 64; i++) {
  boardSpaces.push(i);
}

class ChessPiece {
  position: number;
  alive: boolean;
  color: PlayerColor;

  constructor(position: number, color: PlayerColor) {
    this.position = position;
    this.color = color;
    this.alive = true; // defaults to true
  }
}

// king
// queen
// bishop
// knight
// rook
// pawn

class KingPiece extends ChessPiece {
  constructor(position: number, color: PlayerColor) {
    super(position, color);
  }
}
