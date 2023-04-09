import React from "react";

import "./FanoronaBoard.css";

const horizontalCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
const verticalase = ['0', '1', '2', '3', '4'];

function FanoronaBoard(){

    let board = [];

    for(let i = 0; i < horizontalCase.length; i++){
        for(let j = 0; j < verticalase.length; j++){
            board.push(
                <div className="tile">[{horizontalCase[i]}{verticalase[j]}] </div>
            );
        }
    }

    return (
        <div id="fanoronaboard">
            {board}
        </div>
    );
}

export default FanoronaBoard