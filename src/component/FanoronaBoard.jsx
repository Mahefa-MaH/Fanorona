import React,{useEffect, useRef, useState} from "react";
import Line3 from "./Line3";
import Tile from "./tile";
import Stones from "./Stones";

import "./FanoronaBoard.css";

const verticalCase = ['a', 'b', 'c', 'd', 'e'];
const horizontalCase = ['0', '1', '2', '3', '4', '5', '6', '7','8'];

const tab_p_init = []; 

//Initialisation de la table
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
        pieces.x = j;
        pieces.y = i;
        tab_p_init.push(pieces);
    }
} 


function FanoronaBoard(){
    const boardRef = useRef(null);
    const [tab_p, setPieces] = useState(tab_p_init);

    let board = [];

    useEffect(() => {
        let tab_p = [];
        for(let i = 0; i < verticalCase.length; i++){
            for(let j = 0; j < horizontalCase.length; j++){
    
                let image = undefined;
    
                if(j < 2){
                    image = "./assets/images/lot.png";
                }
                else if(j > 2){
                    image = "./assets/images/logo192.png";
                }else if( i !== 4){
                    if( (i%2 === 0 && i<4) || (i%2 !== 0 && i>4)){
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
            }
        }
    }, []);

    let activePiece;  


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
            const x = e.clientX - 20;
            const y = e.clientY - 20;
            // activePiece.style.position = "absolute";

            //Limitaion board mouvement
            activePiece.style.left =  (x < minX)?`${minX}px`:((x > maxX)?`${maxX}px`:`${x}px`);
            activePiece.style.top =  (y < minY)?`${minY}px`:((y > maxY)?`${maxY}px`:`${y}px`);
        }
    }
    
    function dropPiece(e){
        if(activePiece){
            let p_x = (e.clientX-110) / 155;
            let posx = Math.floor(p_x);
            let p_y = (e.clientY-110) / 155;
            let posy = Math.floor(p_y);
            if((p_x-posx) * 100 < 20){
                p_x = Math.floor(p_x);
            }else if((p_x-posx)  * 100 > 95){
                p_x = Math.ceil(p_x);
            }
            if((p_y-posy) * 100 < 20){
                p_y = Math.floor(p_y);
            }else if((p_y-posy) * 100 > 95){
                p_y = Math.ceil(p_y);
            }
            console.log((e.clientX-60) / 195 , (e.clientY-60) / 195);
            console.log("["+p_x+","+p_y+"]");

            setPieces((value) => {
                const tab = value.map((p) => {
                    if(p.x === 3 && p.y === 0){
                        p.y = 4;
                    }
                    return p;
                });
                return tab;
            });

            activePiece = false;
        }
    }

    //Boucle pour avoir les donnees des pieces
    let image = undefined;
    for(let i = 0; i < verticalCase.length; i++){
        for(let j = 0; j < horizontalCase.length; j++){

            tab_p.forEach((p) => {
                if( p.y === i && p.x === j ){
                    image = p.image;
                }
            });

            board.push(
                <Tile x={j} y={i} image={image}/>
            );
        }
    }console.log(tab_p);

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