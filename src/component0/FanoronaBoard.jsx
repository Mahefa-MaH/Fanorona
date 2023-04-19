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
  const radius = blockSize / 7;
  let selectedP = new Piece();
  let player = Math.ceil((Math.random()*10)%2);
  let lalanaNandeanan = [];
  let tab_dpos = [];
  let findEnemyPiece = false;
  let piece_selectable = [];
  const [nPiece, setNPiece] = useState([0,0,0]);
  let newTurn = true;


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
      if(newTurn){
        Draw();
        lalanaNandeanan = [];
        tab_dpos = [];
        findEnemyPiece = false;
        piece_selectable = [];
        setNPiece([0,0,0]);
        player = Math.ceil((Math.random()*10)%2);
      }
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
      if( Map.mapPObj.length <= row || newTurn){
        Map.mapPObj.push([]);
        newTurn = false;
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
               w = 40;
               h = 40;
            }
          }
        }
        DrawPiece(ctx, vato, x, y , w , h);

        //Creer le Map
        if(true){
          var piece = new Piece(Map.map[row][col], x, y, row, col, "./assets/image/");
          if( Map.mapPObj[row].length <= col){
            Map.mapPObj[row].push(piece);
            nPiece[Map.map[row][col]]++;
            setNPiece([nPiece[0],nPiece[1],nPiece[2]]);
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
          ctx.fillStyle = "#cccccc";
          ctx.arc(x, y, radius+(w-30)/2, 0, 2 * Math.PI);
          ctx.fill();
          const p_image = new Image();
          p_image.src = "./assets/images/vato3.png";
          p_image.onload = () => {
            ctx.drawImage(p_image,x-w/2,y-w/2,w,h);
          }
        }else if(vato === 2){
          ctx.fillStyle = "black";
          ctx.arc(x, y, radius+(w-30)/2, 0, 2 * Math.PI);
          const p_image = new Image();
          p_image.src = "./assets/images/vato4.png";
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
    let x = Math.round((cX -halfBlock ) / blockSize);
    let r_x = (cX -halfBlock ) / blockSize - x;
    let y = Math.round((cY - halfBlock) / blockSize);
    let r_y = ((cY -halfBlock) / blockSize) - y;
    x = x>0?x:0; x = x<9?x:8;
    y = y>0?y:0; y = y<5?y:4;
    if(!findEnemyPiece){
        tab_dpos = canMoveTo(x,y);

        if(Map.mapPObj[y][x].p===player && Math.abs(r_x) < 0.2 && Math.abs(r_y) < 0.2 && tab_dpos.length>0){
          Map.mapPObj[y][x].capture();
          selectedP = Map.mapPObj[y][x];
          DrawPiece(ctx, Map.mapPObj[y][x]["p"], x*blockSize+halfBlock, y*blockSize+halfBlock, 60, 60);
          activePiece = true;

          //Draw a mark circle "canMove" position
          tab_dpos.forEach(val => {
            ctx.beginPath();
            ctx.fillStyle = "#00220066";
            ctx.arc(val[0]*blockSize+halfBlock, val[1]*blockSize+halfBlock, radius+10, 0, 2 * Math.PI);
            ctx.fill();
          });

          //Draw a circle mark "tilePassed" position
          lalanaNandeanan.forEach(val => {
            ctx.beginPath();
            ctx.fillStyle = "#22000066";
            ctx.arc(val[0]*blockSize+halfBlock, val[1]*blockSize+halfBlock, radius+10, 0, 2 * Math.PI);
            ctx.fill();
          });
        }
        ctx.fillStyle = "white";
      }else{
        let changePlayer=false;
        for(let i=0;i<piece_selectable.length;i++){
          if(piece_selectable[i][0]===x && piece_selectable[i][1]===y ){
            console.log(x,y);
            let elimin=false;
            if(i==0){
              elimin = eliminPiece(player, ctx, y-piece_selectable[i][3], x-piece_selectable[i][2], piece_selectable[i][3], piece_selectable[i][2] , false, true)===true;
              console.log("avant")
            }else{
              elimin = eliminPiece(player, ctx, y-piece_selectable[i][3]*2, x-piece_selectable[i][2]*2, piece_selectable[i][3], piece_selectable[i][2] , true, true)===true;
              console.log("aoriana")
            }
            if( elimin ){
              //Draw a mark circle "Selectable" piece
                piece_selectable.forEach(value=>{
                  DrawPiece(ctx, Map.mapPObj[value[1]][value[0]].p, value[0]*blockSize+80, value[1]*blockSize+80, 40, 40);
                }
              );
              changePlayer = true;
              tab_dpos.forEach(value=>{
                let canEliminMoreAv = ( eliminPiece(player, ctx, value[1], value[0], value[1]-y-piece_selectable[i][3], value[0]-x-piece_selectable[i][2] , false, false)===true);
                let canEliminMoreAr = eliminPiece(player, ctx, value[1], value[0], (value[1]-y-piece_selectable[i][3]*2)*-1, (value[0]-x-piece_selectable[i][2]*2)*-1 , true, false)===true;
                if(canEliminMoreAr || canEliminMoreAv){
                  console.log("can Eliminate",value[1],value[0],"de x,y",y,x);
                  changePlayer = false;
                  // throw "";
                }else{
                  lalanaNandeanan = [];
                  console.log("can't Eliminate");
                }
              });
            }else{
              changePlayer = true;
              lalanaNandeanan = [];
            }
            console.log("123",lalanaNandeanan)
            //Echanger le tours des players
            if(changePlayer){player = player===2?1:2;lalanaNandeanan = [];}
            findEnemyPiece = false;

            piece_selectable = [];
          }
        }
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
          if(cX<=10 || cX >=element.width || cY <=10 || cY>=element.height ){
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
        let dpos = false;
        
        //Draw a mark circle "canMove" position
        tab_dpos.forEach(value=>{
                if(value[0]===x&&value[1]===y){dpos = true;}
                DrawPiece(ctx, 0, value[0]*blockSize+80, value[1]*blockSize+80, 40, 40);
             }
          );

        //Draw a mark circle "Passed" position
        lalanaNandeanan.forEach(value=>{
            DrawPiece(ctx, 0, value[0]*blockSize+80, value[1]*blockSize+80, 40, 40);
          }
        );

        lalanaNandeanan.forEach(value=>{if(value[0]===x&value[1]===y){dpos=false;return}});
        if(Math.abs(r_x) < 0.2 && Math.abs(r_y) < 0.2 && sp.isCaptured && Map.mapPObj[y][x].p === 0 && dpos){
          const a = Map.mapPObj[y][x].p;
          const b = sp.p;
          sp.lacher();
          Map.mapPObj[sp.row][sp.col]["p"] = a;
          Map.mapPObj[y][x]["p"] = b;
          DrawPiece(ctx, b, x*blockSize+80, y*blockSize+80, 40, 40);
          DrawPiece(ctx, a, sp.x, sp.y, 40, 40);
          

          //Eliminer les pieces adverses
          let vectorY = 0;
          let vectorX = 0;
          vectorY = y-sp.row;
          vectorX = x-sp.col;
          let changePlayer=false;
          let eliminAvant = eliminPiece(player, ctx, y, x, vectorY, vectorX , false, false)===true;
          let eliminArriere = eliminPiece(player, ctx, y, x, vectorY*-1, vectorX*-1, true, false)===true;
          if( eliminAvant && eliminArriere ){
            findEnemyPiece = true;
            lalanaNandeanan.push([sp.col,sp.row]);
            tab_dpos = canMoveTo(x,y);
            piece_selectable.push([x+vectorX,y+vectorY,vectorX,vectorY],[x+vectorX*-2,y+vectorY*-2,vectorX*-1,vectorY*-1]);
            //Draw a mark circle "Find" piece
            piece_selectable.forEach(val=>{
              ctx.beginPath();
              ctx.fillStyle = "#00002255";
              ctx.arc(val[0]*blockSize+halfBlock, val[1]*blockSize+halfBlock, radius+10, 0, 2 * Math.PI);
              ctx.fill();
              }
            );
          }else{
            eliminAvant = eliminPiece(player, ctx, y, x, vectorY, vectorX , false, true)===true;
            eliminArriere = eliminPiece(player, ctx, y, x, vectorY*-1, vectorX*-1, true, true)===true;
            if( eliminAvant || eliminArriere ){
              lalanaNandeanan.push([sp.col,sp.row]);

              //Prevoir s'il pourra eliminer encore
              tab_dpos = canMoveTo(x,y);
              changePlayer = true;
              tab_dpos.forEach(value=>{
                let canEliminMoreAv = ( eliminPiece(player, ctx, value[1], value[0], value[1]-y, value[0]-x , false, false)===true);
                let canEliminMoreAr = eliminPiece(player, ctx, value[1], value[0], (value[1]-y)*-1, (value[0]-x)*-1 , true, false)===true;
                if(canEliminMoreAr || canEliminMoreAv){
                  console.log("can Eliminate",value[1],value[0],"de x,y",y,x);
                  changePlayer = false;
                  // throw "";
                }else{
                  // lalanaNandeanan = [];
                  console.log("can't Eliminate");
                }
              });
            }else{
              changePlayer = true;
              lalanaNandeanan = [];
            }
          }

          //Echanger le tours des players
          if(changePlayer){player = player===2?1:2;lalanaNandeanan = [];}else{}

          activePiece = false;
          return;
          //Placer la piece
        
        }
        activePiece = false;
        // Map.mapPObj[y][x].lacher();  
        DrawPiece(ctx, sp.p, sp.x, sp.y, 40, 40);
      }
      selectedP = 0;
  }

  function canMoveTo(x, y){
    var t = [];
    var lln = [];
    let mpush = true;

    if( (x+y)%2 === 0 ){
      for(let i = x-1; i <= x+1; i++){
        for(let j = y-1; j <= y+1; j++){
                mpush = true;
                if( (lalanaNandeanan.length > 0 ) ){
                  lalanaNandeanan.forEach(val => {
                    if(val[0]===i&&val[1]===j){
                      mpush = false;
                    }
                  });
                }
                if( !(i===x && j===y) && i>-1 && j>-1 && i<9 && j<5 && Map.mapPObj[j][i].p===0 && mpush){
                    t.push([i,j]);
                }
            }
        }
    }else{
      for(let i = x-1; i <= x+1; i++){
        for(let j = y-1; j <= y+1; j++){
                mpush = true;
                if( (lalanaNandeanan.length > 0 ) ){
                  lalanaNandeanan.forEach(val => {
                    if(val[0]===i&&val[1]===j){
                      mpush = false;
                    }
                  });
                }
                if(  !(i===x && j===y) && (i===x || j===y) && i>-1 && j>-1 && i<9 && j<5 && Map.mapPObj[j][i].p===0 && mpush ){
                    t.push([i,j]);
                }
            }
        }
    }
    return t;
  }

  function eliminPiece(player, ctx, y, x, vectorY, vectorX , arriere, elimination){
    let i = y;
    let j = x;
    if(arriere){
      i+=vectorY*2;
      j+=vectorX*2;
    }else{
      i+=vectorY;
      j+=vectorX;
    }
    
    let retour = false;
    let canEliminate = false;
    let voadaka = 0;
    if( i>=0 && i<5 && j>=0 && j<9 ){
      canEliminate = true;
    }else{
      canEliminate = false;
    }
    while(canEliminate){
      // console.log(Map.mapPObj[i][j].p ,i,j)
      if(Map.mapPObj[i][j].p === ((player+2)%2+1)){
        if(elimination){
          Map.mapPObj[i][j].p = 0;
          nPiece[(player+2)%2+1]--;
          setNPiece([nPiece[0],nPiece[1],nPiece[2]]);
          if(nPiece[((player+2)%2+1)]<=0){
            console.log("la partie est termine");
            console.log("le player", player,"a gagne");
            newTurn = true;
          }
          ctx.clearRect(j*blockSize+50, i*blockSize+50, 60, 60);
          retour = true;
          // isambato[player-1]--;
        }else{
          return true;
        }
      }else{
        canEliminate = false;
        return retour;
      }
      i+=vectorY;
      j+=vectorX;
      if( (i>-1) && i<5 && j>-1 && j<9 ){
          canEliminate = true;
      }else{
        canEliminate = false;
      }
    }
    return retour;
  }

  return (<div>
            <div style={{textAlign:`-moz-center`,}}>
              <table style={{
                width: `50%`,
                textAlign: `center`,
                color: `#fff`,
                backgroundColor: `#000`,
                margin: `10px`,
                border: `5px`,
                fontSize: `35px`,
                borderRadius: `20px`,
              }}>
                <tbody>
                <tr>
                  <td>
                    Player 1 : <strong>{nPiece[1]}</strong>
                  </td>
                  <td>
                    Player 2 : <strong>{nPiece[2]}</strong>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          <canvas
                style={{
                  backgroundImage: `url(./assets/images/board.png)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
                ref={canvasRef}
          />
          </div>);
}

export default FanoronaBoard;