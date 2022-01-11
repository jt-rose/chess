type PlayerColor = "white" | "black";

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

// build out starting board of 64 spots with no pieces set
let boardSpaces: (ChessPieces | null)[] = [];
for (let i = 0; i < 64; i++) {
  boardSpaces.push(null);
}

// fill the empty board with pieces in their starting positions
const setBoard = () => {
  // set up blacks
  boardSpaces[0] = new Rook("black");
  boardSpaces[1] = new Knight("black");
  boardSpaces[2] = new Bishop("black");
  boardSpaces[3] = new Queen("black");
  boardSpaces[4] = new King("black");
  boardSpaces[5] = new Bishop("black");
  boardSpaces[6] = new Knight("black");
  boardSpaces[7] = new Rook("black");

  // set up black pawns
  for (let i = 8; i < 16; i++) {
    boardSpaces[i] = new Pawn("black");
  }

  // set up empty spaces - useful for resetting the board for a new game
  for (let i = 16; i < 48; i++) {
    boardSpaces[i] = null;
  }
  // set up white pawns
  for (let i = 48; i < 56; i++) {
    boardSpaces[i] = new Pawn("white");
  }

  // set up whites
  boardSpaces[56] = new Rook("white");
  boardSpaces[57] = new Knight("white");
  boardSpaces[58] = new Bishop("white");
  boardSpaces[59] = new Queen("white");
  boardSpaces[60] = new King("white");
  boardSpaces[61] = new Bishop("white");
  boardSpaces[62] = new Knight("white");
  boardSpaces[63] = new Rook("white");
};

setBoard();
console.log(boardSpaces);
console.log(boardSpaces.length);

/*
// Board Indexes:
[
    0,1,2,3,4,5,6,7,
    8,9,10,11,12,13,14,15,
    16,17,18,19,20,21,22,23,
    24,25,26,27,28,29,30,31,
    32,33,34,35,36,37,38,39,
    40,41,42,43,44,45,46,47,
    48,49,50,51,52,53,54,55,
    56,57,58,59,60,61,62,63
]
*/

const topEdge = [0, 1, 2, 3, 4, 5, 6, 7];
const rightEdge = [7, 15, 23, 31, 39, 47, 55, 63];
const bottomEdge = [56, 57, 58, 59, 60, 61, 62, 63];
const leftEdge = [0, 8, 16, 24, 32, 40, 48, 56];
