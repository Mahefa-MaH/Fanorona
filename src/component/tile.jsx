import React from "react";
import "./tile.css";


export default function Tile(props){
    return (<div key={"tile-"+props.x+"-"+props.y} className="tile" >
                <div style={{
                    backgroundImage: `url(${props.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    }} className="piece">
                </div>
                {/* <img src={props.image}/> */}
            </div>);
}