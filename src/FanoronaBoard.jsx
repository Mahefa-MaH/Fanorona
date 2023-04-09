/**
 * Isometric Line
*/

import React, { useRef, useEffect } from 'react';
import Piece from './Piece';
import Map from './Map';

function FanoronaBoard() {
  const canvasRef = useRef(null);

  function updateCanvasSize(context) {
    var width = (window.width()/10)*9;
    var height = (window.height()/10)*9;
    context.canvas.width  = width;
    context.canvas.height = height;
    };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const blockSize = 160; // Size of each tile
    const halfBlock = blockSize / 2;
    const rowCount = 5;
    const columnCount = 9;
    const radius = blockSize / 20;
  
    // Set canvas size to fit board
    canvas.width = blockSize*columnCount;
    canvas.height = blockSize*rowCount;

    function contains(x, y) {
      return (x - halfBlock <= x && x <= x + halfBlock &&
              y - halfBlock <= y && y <= y + halfBlock);
    }
    
  
    // Draw tiles
    for (let row = 0; row < rowCount; row++) {
      if( Map.mapPObj.length <= row){
        Map.mapPObj.push([]);
      }
      for (let col = 0; col < columnCount; col++) {
        let x = (col - row) * halfBlock + canvas.width / 2;
        let y = (row + col) * (blockSize / 4);
        x -= (Math.sqrt(columnCount)-1)*halfBlock;
        y += (Math.sqrt(rowCount)-0.5)*halfBlock;

        // Draw line and column tile
        if(col === 0  ){
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + (columnCount-1)*halfBlock, y+(rowCount-1)*halfBlock);
          ctx.stroke();
        }
        if((row === 0 )){
          ctx.beginPath();  
          ctx.moveTo(x, y);
          ctx.lineTo((x - blockSize*2), y+blockSize);
          ctx.stroke();
        }

        // Draw diagonal line
        ctx.beginPath();
        if (col % 2 === 0 && col > 0 && row < rowCount-1 && row%2 === 0) {
          ctx.moveTo(x , y);
          ctx.lineTo( x- 2*blockSize, y );
        }
        if (col % 2 === 0 && col > 0 && row > 0 && row%2 === 0) {
          ctx.moveTo(x, y );
          ctx.lineTo(x , y - 2*halfBlock);
        }
        ctx.stroke();

        // Draw circle piece
        var vato = Map.map[row][col];
        if( Map.mapPObj.length-1 === rowCount){
          if( Map.mapPObj[rowCount].length-1 === columnCount){
            vato = Map.mapPObj[row][col];
          }
        }
        ctx.beginPath();
        if(vato === 1){
          ctx.fillStyle = "green";
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        }else if(vato === 2){
          ctx.fillStyle = "black";
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        }
        if(Map.map[row][col]!== 0){
          var piece = new Piece(Map.map[row][col], x, y);
          // Add mouse down event listener to piece
        // piece.onMouseDown = (event) => {
        //   console.log(`Piece at row ${row}, column ${col} was clicked`);
        //   // You can add your logic for handling the click event here
        // }
          if( Map.mapPObj[row].length <= col){
            Map.mapPObj[row].push(piece);
          }
        }

      }
    }

    // canvas.addEventListener('mousedown', rehefMouseDown);
    //   // canvas.addEventListener('mousedown', (Event)=>{
    //   //   console.log("Yes");
    //   // });
    //   return () => canvas.removeEventListener('mousedown',rehefMouseDown);
    //   function rehefMouseDown(Event){
    //     let rect = canvas.getBoundingClientRect();
    //     let mouseX = Event.clientX -rect.left;
    //     let mouseY = Event.clientY - rect.top;
    //     for(let pi of Map.mapPObj){
    //       for(let pj of Map.mapPObj[rowCount-1]){
    //         if(true){
    //           console.log(pj);
    //         }
    //       }
    //     }
    //   }



  }, []);
  
  console.log(Map.mapPObj)
  return <canvas ref={canvasRef} width={1000} height={600} />;
}

export default FanoronaBoard;

