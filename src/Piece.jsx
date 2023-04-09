class Piece {
    constructor(p, x, y) {
      this.p = p;
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
  }
  

// class Piece {
//   constructor(color, row, col, blockSize, halfBlock, ctx) {
//     this.color = color;
//     this.row = row;
//     this.col = col;
//     this.blockSize = blockSize;
//     this.halfBlock = halfBlock;
//     this.ctx = ctx;
//   }

//   draw() {
//     let x = (this.col - this.row) * this.halfBlock + this.blockSize / 2;
//     let y = (this.row + this.col) * (this.blockSize / 4);
//     const radius = this.blockSize / 30;

//     // Set piece color
//     if (this.color === "black") {
//       this.ctx.fillStyle = "#000";
//     } else if (this.color === "white") {
//       this.ctx.fillStyle = "#fff";
//     }

//     // Draw circle piece
//     this.ctx.beginPath();
//     this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
//     this.ctx.fill();
//   }
// }

export default Piece;