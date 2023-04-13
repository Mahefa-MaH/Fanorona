import React,{useRef} from "react";
import Line3 from "./Line3";
import Tile from "./tile";
import Stones from "./Stones";

import "./FanoronaBoard.css";

const verticalCase = ['a', 'b', 'c', 'd', 'e'];
const horizontalCase = ['0', '1', '2', '3', '4', '5', '6', '7','8'];

const tab_p = [];

let activePiece;


function FanoronaBoard(){
    const boardRef = useRef(null);

    function grabPiece(e){
        const element = e.target;
        if(element.classList.contains("piece")){
            const x = e.clientX - 20;
            const y = e.clientY - 20;
            element.style.position = "absolute";
            element.style.left =  `${x}px`;
            element.style.top = `${y}px`;
    
            activePiece = element;
        }
    }
    
    function movePiece(e){
        const boardr = boardRef.current;
        if(activePiece && boardRef){
            const minX = boardr.offsetLeft;
            const minY = boardr.offsetTop;
            const maxX = boardr.offsetLeft + boardr.clientWidth - 90;
            const maxY = boardr.offsetTop + boardr.clientHeight - 110;
            console.log(maxY);
            const x = e.clientX - 20;
            const y = e.clientY - 20;
            activePiece.style.position = "absolute";
            activePiece.style.top = `${y}px`;

            activePiece.style.left =  (x < minX)?`${minX}px`:((x > maxX)?`${maxX}px`:`${x}px`);
            activePiece.style.top =  (y < minY)?`${minY}px`:((y > maxY)?`${maxY}px`:`${y}px`);
        }
    }
    
    function dropPiece(e){
        if(activePiece){
            activePiece = false;
        }
    }

    let board = [];

    for(let i = 0; i < verticalCase.length; i++){
        for(let j = 0; j < horizontalCase.length; j++){

            let image = undefined;

            if(i < 2){
                image = "./assets/images/lot.png";
            }
            else if(i > 2){
                image = "./assets/images/logo192.png";
            }else if( j !== 4){
                if( (j%2 === 0 && j<4) || (j%2 !== 0 && j>4)){
                    image = "./assets/images/lot.png";
                }else{
                    image = "./assets/images/logo192.png";
                }
            }

            const pieces = new Stones;
            pieces.image = image;
            pieces.x = i;
            pieces.y = j;
            tab_p.push(pieces);

            board.push(
                <Tile x={i} y={j} image={image}/>
            );
        }
    }

    return (
        <div
            onMouseMove={e => movePiece(e)}
            onMouseDown={e => grabPiece(e)}
            onMouseUp={e => dropPiece(e)}
            id="fanoronaboard"
            ref={boardRef}
            >
                {board}
        </div>
    );
}

export default FanoronaBoard