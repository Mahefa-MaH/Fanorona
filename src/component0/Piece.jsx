class Piece {
    constructor(p, x, y, image) {
      this.p = p;
      this.image  = image;
      this.x = x;         // the x position of the piece on the board
      this.y = y;         // the y position of the piece on the board
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