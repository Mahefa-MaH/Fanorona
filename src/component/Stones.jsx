import React, { useState } from "react";

class Stones{
    image;
    x;
    y;
};

export default Stones;

// function Stones(props){
//     const [x, setX] = useState(props.x);
//     const [y, setY] = useState(props.y);

//     const handleClick = (e) => {
//         e.preventDefault();
//         setX(e.pageX);
//         setY(e.pageY);
//     };

//     return (
//         <div
//             style={{
//                 position: 'absolute',
//                 top: y -25,
//                 left: x -25,
//                 width: '50px',
//                 height: '50px',
//                 borderRadius: '50%',
//                 backgroundColor: props.color,
//                 cursor: 'pointer',
//             }}
//             onClick={handleClick}
//         ></div>
//     );
// }