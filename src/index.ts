export type PlayerColor = "white" | "black";

export const boardPlaces = [
  [1, 2, 3, 4, 5, 6, 7, 8], // a
  [1, 2, 3, 4, 5, 6, 7, 8], // b
  [1, 2, 3, 4, 5, 6, 7, 8], // c
  [1, 2, 3, 4, 5, 6, 7, 8], // d
  [1, 2, 3, 4, 5, 6, 7, 8], // e
  [1, 2, 3, 4, 5, 6, 7, 8], // f
  [1, 2, 3, 4, 5, 6, 7, 8], // g
  [1, 2, 3, 4, 5, 6, 7, 8], // h
];

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
