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
  let selectedP = new Piece();

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
      grabPiece(e, ctx);
    }
    function rehefMouseMove(e){
      movePiece(e, ctx);
    }
    function rehefMouseUp(e){
      dropPiece(e, ctx);
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
          var piece = new Piece(Map.map[row][col], x, y, row, col, "./assets/image/");
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
            ctx.drawImage(p_image,x-w/2,y-w/2,w,h);
          }
        }
  }

  let activePiece; 
  function grabPiece(e, ctx){
    const element = e.target;
    const canvasRect = element.getBoundingClientRect();
    const scaleX = element.width / canvasRect.width;
    const scaleY = element.height / canvasRect.height;
    const cX = (e.clientX - canvasRect.left)*scaleX;
    const cY = (e.clientY - canvasRect.top)*scaleY;
    if(true){
        let x = Math.round((cX -halfBlock ) / blockSize);
        let r_x = (cX -halfBlock ) / blockSize - x;
        let y = Math.round((cY - halfBlock) / blockSize);
        let r_y = ((cY -halfBlock) / blockSize) - y;
        x = x>0?x:0; x = x<9?x:8;
        y = y>0?y:0; y = y<5?y:4;

        if(Math.abs(r_x) < 0.2 && Math.abs(r_y) < 0.2){
          Map.mapPObj[y][x].capture();
          selectedP = Map.mapPObj[y][x];
          DrawPiece(ctx, Map.mapPObj[y][x]["p"], x*blockSize+halfBlock, y*blockSize+halfBlock, 60, 60);
          // Map.mapPObj[y][x].p = 2;
          // Map.mapPObj[y][x].x = e.clientX;
          // Map.mapPObj[y][x].y = e.clientY;
        }
        ctx.fillStyle = "white";
        activePiece = true;
      }
  }

  function movePiece(e, ctx){
    const element = e.target;
    const canvasRect = element.getBoundingClientRect();
    const scaleX = element.width / canvasRect.width;
    const scaleY = element.height / canvasRect.height;
    const cX = (e.clientX - canvasRect.left)*scaleX;
    const cY = (e.clientY - canvasRect.top)*scaleY;
      if(activePiece){
        let x = Math.round((cX -halfBlock ) / blockSize);
        let r_x = (cX -halfBlock ) / blockSize - x;
        let y = Math.round((cY - halfBlock) / blockSize);
        let r_y = ((cY -halfBlock) / blockSize) - y;
          x = x>0?x:0; x = x<9?x:8;
          y = y>0?y:0; y = y<5?y:4;
          const minX = ctx.offsetLeft;
          const minY = ctx.offsetTop;
          const maxX = ctx.offsetLeft + ctx.clientWidth - 90;
          const maxY = ctx.offsetTop + ctx.clientHeight - 110;
          if(x<minX){
            dropPiece(e,ctx);
          }

          // Draw();
      }
  }

  function dropPiece(e, ctx){
    const element = e.target;
    const canvasRect = element.getBoundingClientRect();
    const scaleX = element.width / canvasRect.width;
    const scaleY = element.height / canvasRect.height;
    const cX = (e.clientX - canvasRect.left)*scaleX;
    const cY = (e.clientY - canvasRect.top)*scaleY;
    const sp = selectedP;
      if(activePiece){
        let x = Math.round((cX -halfBlock ) / blockSize);
        let r_x = (cX -halfBlock ) / blockSize - x;
        let y = Math.round((cY - halfBlock) / blockSize);
        let r_y = ((cY -halfBlock) / blockSize) - y;
        x = x>0?x:0; x = x<9?x:8;
        y = y>0?y:0; y = y<5?y:4;
        if(Math.abs(r_x) < 0.2 && Math.abs(r_y) < 0.2 && sp.isCaptured && Map.mapPObj[y][x].p === 0 ){
          const a = Map.mapPObj[y][x].p;
          const b = sp.p;
          sp.lacher();
          Map.mapPObj[sp.row][sp.col]["p"] = a;
          Map.mapPObj[y][x]["p"] = b;
          DrawPiece(ctx, b, x*blockSize+80, y*blockSize+80, 40, 40);
          DrawPiece(ctx, a, sp.x, sp.y, 40, 40);
          activePiece = false;
          return;
          //Placer la piece
        
        }
        activePiece = false;
        Map.mapPObj[y][x].lacher();
        DrawPiece(ctx, sp.p, sp.x, sp.y, 40, 40);
      }
      selectedP = 0;
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