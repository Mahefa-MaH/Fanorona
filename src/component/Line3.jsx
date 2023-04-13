import React, { useRef, useEffect } from "react";

export default function Line3(props){
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { x1, y1, x2, y2 } = props;

        //Draw les lines
        ctx.beginPath();
        ctx.strokeStyle('red');
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth(2);
        ctx.stroke();
    }, [props]);

    return <canvas ref={canvasRef} width={1400} height={700} />;
}