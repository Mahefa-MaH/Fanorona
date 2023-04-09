// import React, { useRef, useEffect } from 'react';

// function FanoronaBoard() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     // Set the width and height of each square on the chessboard
//     const raw = 5;
//     const column = 9;
//     const blocSize = ctx.canvas.height / (raw+1);
//     const originX = 100;
//     const originY = 100;
//     // const boardWidth = 9 * blocSize;
//     // const boardHeight = 5 * blocSize;
//     // const originX = canvas.width / 2 - boardWidth / 2;
//     // const originY = canvas.height / 2 - boardHeight / 2;

//     // Draw the lines on the chessboard
//     for (let i = 0; i < column; i++) {
//       if (i % 2 === 0) {
//         ctx.fillStyle = 'red';
//         ctx.beginPath();
//         ctx.moveTo((i*blocSize)+originX, originY);
//         ctx.lineTo(originX, ((i+2)/2)*blocSize);
//         ctx.lineTo( ((column-i)*blocSize), (raw*blocSize));
//         ctx.lineTo( (column*blocSize), ((raw-i/2)*blocSize));
//         ctx.lineTo((i*blocSize)+originX, originY);
//         ctx.stroke();
//       }
//       ctx.fillStyle = '#000';
//       ctx.beginPath();
//       ctx.moveTo(i*blocSize+originX, originY);
//       ctx.lineTo(i*blocSize+originX, (raw-1)*blocSize+originY);
//       ctx.stroke();
//     }
      
//     for (let j = 0; j < raw; j++) {
//       ctx.fillStyle = '#000';
//       ctx.beginPath();
//       ctx.moveTo(originX, j*blocSize+originY);
//       ctx.lineTo((column-1)*blocSize+originX, j*blocSize+originY);
//       ctx.stroke();
//     }
//   }, []);

//   return <canvas ref={canvasRef} width={1000} height={600} />;
// }

// export default FanoronaBoard;


/**
 * Isometric Line
*/

import React, { useRef, useEffect } from 'react';
import Piece from './Piece';

function FanoronaBoardDiso() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const blockSize = 100; // Size of each tile
    const halfBlock = blockSize / 2;
    const rowCount = 5;
    const columnCount = 9;
  
    // Set canvas size to fit board
    canvas.width = halfBlock * (columnCount + rowCount) + halfBlock;
    canvas.height = (columnCount + rowCount) * (blockSize / 2);
  
    // Draw tiles
    for (let col = 0; col < columnCount; col++) {
      for (let row = 0; row < rowCount; row++) {
        let x = (col - row) * halfBlock + canvas.width / 2;
        let y = (row + col) * (blockSize / 4);
        x -= 100;
        y += 200;

        // var piece = new Piece("black", row, col, blockSize, halfBlock, ctx);
        // piece.draw();


        // Draw diamond-shaped tile
        if(col === 0){
          ctx.beginPath();
          ctx.moveTo(x, y + halfBlock / 2);
          ctx.lineTo(x + 8*halfBlock, y+4.5*halfBlock);
          ctx.stroke();
        }
        if(row === 0  && (col === 0 || col%2 > 0 ) ){
          ctx.beginPath();  
          ctx.moveTo(x, y + halfBlock / 2);
          ctx.lineTo((x - 4*halfBlock), y+2.5*halfBlock);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(x, y + halfBlock / 2);
        // ctx.lineTo(x + halfBlock, y+500);
        if (col % 2 === 0 && col > 0 && row > 0 ) {
          ctx.moveTo(x + halfBlock, y);
          ctx.lineTo( x- blockSize, y + halfBlock / 2 - halfBlock);
          ctx.moveTo(x + halfBlock, y);
        }
        ctx.lineTo(x, y + halfBlock / 2);
        if (col % 2 === 0 && col > 0 && row > 0) {
          ctx.moveTo(x, y + halfBlock / 2);
          ctx.lineTo(x - halfBlock, y - halfBlock);
        }
        ctx.stroke();

      }
    }
  }, []);
  

  return <canvas ref={canvasRef} width={1000} height={600} />;
}

export default FanoronaBoardDiso;

