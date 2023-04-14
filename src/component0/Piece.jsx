class Piece {
    constructor(p, x, y, row, col, image) {
      this.p = p;
      this.image  = image;
      this.x = x;         // the x position of the piece on the board
      this.y = y;
      this.row = row;         // the x position of the piece on the board
      this.col = col;            // the y position of the piece on the board
      this.isCaptured = false; // whether the piece has been captured or not
    }
  
    // move the piece to a new position on the board
    move(x, y) {
      this.x = x;
      this.y = y;
    }
  
    // capture the piece
    capture() {
      this.isCaptured = true;
    }
    lacher() {
      this.isCaptured = false;
    }
  }

  export default Piece;