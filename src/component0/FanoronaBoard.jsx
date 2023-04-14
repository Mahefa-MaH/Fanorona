import React, { useRef, useEffect, useState } from 'react';
import Piece from './Piece';
import Map from './Map';

function FanoronaBoard() {
  const canvasRef = useRef(null);
  let ctx = undefined;
  const [tab_p, setPieces] = useState([]);
  const blockSize = 160; // Size of each tile
  const halfBlock = blockSize / 2;
  const rowCount = 5;
  const columnCount = 9;
  const radius = blockSize / 9;

  function updateCanvasSize(context) {
    var width = (window.width()/10)*9;
    var height = (window.height()/10)*5;
    context.canvas.width  = width;
    context.canvas.height = height;
    };

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');
    ctx = c;
    let selectedP = [];
  
    // Set canvas size to fit board
    canvas.width = blockSize*columnCount + 85;
    canvas.height = blockSize*rowCount + 85;

    // Draw tiles
    Draw();
    // ctx.drawImage(p_image,0,0,130,230,150-20,150-15,60,100);

    canvas.addEventListener('mousedown', rehefMouseDown);
    canvas.addEventListener('mousemove', rehefMouseMove);
    canvas.addEventListener('mouseup', rehefMouseUp);
    // return () => canvas.removeEventListener('mousedown',rehefMouseDown);
    function rehefMouseDown(e){
      selectedP = grabPiece(e, ctx);
    }
    function rehefMouseMove(e){
      movePiece(e, ctx);
    }
    function rehefMouseUp(e){
      dropPiece(e, ctx, selectedP);
    }

  }, []);

  function Draw(){
    ctx.clearRect(0, 0, blockSize*columnCount + 85, blockSize*rowCount + 85);
    for (let row = 0; row < rowCount; row++) {
      if( Map.mapPObj.length <= row){
        Map.mapPObj.push([]);
      }
      for (let col = 0; col < columnCount; col++) {
        // let x = (col - row) * halfBlock + canvas.width / 2;
        // let y = (row + col) * (blockSize / 4);
        // x -= (Math.sqrt(columnCount)-1)*halfBlock;
        // y += (Math.sqrt(rowCount)-0.5)*halfBlock;
        let x = col * blockSize;
        let y = row * blockSize;
        x += halfBlock;
        y += halfBlock;
        let x2 = x;
        let y2 = y;

/*
        // Draw line and column tile
        if(col === 0  ){
          ctx.beginPath();
          ctx.moveTo(x, y);
          // x2 += (columnCount-1)*halfBlock;
          // y2 += (rowCount-1)*halfBlock;
          x2 = x+ (columnCount - 1)*blockSize;
          y2 = y;
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        if((row === 0 )){
          ctx.beginPath();  
          ctx.moveTo(x, y);
          // x2 -= (blockSize*2);
          // y2 += blockSize;
          x2 = x;
          y2 = y + (rowCount - 1)*blockSize;
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        // Draw diagonal line
        ctx.beginPath();
        if (col % 2 === 0 && col > 0 && row > 0 && row%2 === 0) {
          ctx.moveTo(x , y);
          // x2 = x;
          // y2 = y - 2*halfBlock;
          x2 = x - 2*blockSize;
          y2 = y - 2*blockSize;
          ctx.lineTo( x2, y2 );
        }
        if (col % 2 === 0 && col > 0 && row < rowCount-1 && row%2 === 0) {
          ctx.moveTo(x, y );
          // x2 = x- 2*blockSize;
          // y2 = y;
          x2 = x - 2*blockSize;
          y2 = y + 2*blockSize;
          ctx.lineTo(x2 , y2);
        }
        ctx.stroke();
*/

        // Draw circle piece
        var vato = Map.map[row][col];
        let w = 40;
        let h = 40;
        if( Map.mapPObj.length === rowCount){
          if( Map.mapPObj[rowCount-1].length === columnCount){
            vato = Map.mapPObj[row][col]["p"];
            x = Map.mapPObj[row][col]["x"];
            y = Map.mapPObj[row][col]["y"];
            if(Map.mapPObj[row][col].isCaptured){
               w = 60;
               h = 60;
            }
            // console.log( p)
          }
        }
        
        DrawPiece(ctx, vato, x, y , w , h);

        if(true){
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
  }

  function DrawPiece(ctx, vato, x, y, w, h){
        ctx.clearRect(x-w, y-h, 2*w, 2*h);
        // ctx.fillRect(x-w, y-h, 2*w, 2*h);
        console.log(x, y , x+5)
        ctx.beginPath();
        if(vato === 1){
          ctx.fillStyle = "green";
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
          const p_image = new Image();
          p_image.src = "./assets/images/lot.png";
          p_image.onload = () => {
            ctx.drawImage(p_image,x-w/2,y-w/2,w,h);
          }
        }else if(vato === 2){
          ctx.fillStyle = "black";
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          const p_image = new Image();
          p_image.src = "./assets/images/logo192.png";
          ctx.fill();
          p_image.onload = () => {
            ctx.drawImage(p_image,x-20,y-20,w,h);
          }
        }
  }

  let activePiece; 
  function grabPiece(e, ctx){
    let selectedP = [];
    const element = e.target;
    if(element){
        let x = Math.round((e.clientX - halfBlock) / blockSize);
        let r_x = (e.clientX - halfBlock) / blockSize - x;
        let y = Math.round((e.clientY - halfBlock) / blockSize);
        let r_y = ((e.clientY - halfBlock) / blockSize) - y;
        x = x>0?x:0; x = x<9?x:8;
        y = y>0?y:0; y = y<5?y:4;

        if(Math.abs(r_x) < 0.2 && Math.abs(r_y) < 0.2){
          Map.mapPObj[y][x].capture();
          // Map.mapPObj[y][x].p = 2;
          // Map.mapPObj[y][x].x = e.clientX;
          // Map.mapPObj[y][x].y = e.clientY;
        }
        ctx.fillStyle = "white";
        DrawPiece(ctx, Map.mapPObj[y][x]["p"], x*blockSize+80, y*blockSize+80, 60, 60);
        console.log(Map.mapPObj[y][x]);
        activePiece = element;
        selectedP.push(x);
        selectedP.push(y);
      }
      return selectedP;
  }

  function movePiece(e, ctx){
      if(activePiece){
          let x = Math.round((e.clientX - halfBlock) / blockSize);
          let r_x = (e.clientX - halfBlock) / blockSize - x;
          let y = Math.round((e.clientY - halfBlock) / blockSize);
          let r_y = ((e.clientY - halfBlock) / blockSize) - y;
          x = x>0?x:0; x = x<9?x:8;
          y = y>0?y:0; y = y<5?y:4;
          const minX = ctx.offsetLeft;
          const minY = ctx.offsetTop;
          const maxX = ctx.offsetLeft + ctx.clientWidth - 90;
          const maxY = ctx.offsetTop + ctx.clientHeight - 110;
          if(r_x < 0.2 && r_y < 0.2){
            //
          }

          // Draw();
      }
  }

  function dropPiece(e, ctx, sp){
      if(activePiece){
        let x = Math.round((e.clientX - halfBlock) / blockSize);
        let r_x = (e.clientX - halfBlock) / blockSize - x;
        let y = Math.round((e.clientY - halfBlock) / blockSize);
        let r_y = ((e.clientY - halfBlock) / blockSize) - y;
        x = x>0?x:0; x = x<9?x:8;
        y = y>0?y:0; y = y<5?y:4;
        console.log(y)
        if(Math.abs(r_x) < 0.2 && Math.abs(r_y) < 0.2){
          DrawPiece(ctx, Map.mapPObj[y][x]["p"], x*blockSize+80, y*blockSize+80, 40, 40);
          // Map.mapPObj[y][x].lacher();
          //Placer la piece
        }
        Map.mapPObj[y][x].lacher();
        activePiece = false;
        DrawPiece(ctx, Map.mapPObj[sp[1]][sp[0]]["p"], sp[0]*blockSize+80, sp[1]*blockSize+80, 40, 40);
      }
  }
  return <canvas
                style={{
                  backgroundImage: `url(./assets/images/board.png)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
                ref={canvasRef} width={1000} height={800} />;
}

export default FanoronaBoard;