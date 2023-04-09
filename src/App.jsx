import React from 'react'
import Canvas from './Canvas'
import FanoronaBoard from './FanoronaBoard'

function App() {
  
  // const draw = (ctx, frameCount) => {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  //   ctx.fillStyle = '#ff0055'
  //   ctx.beginPath()
  //   ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
  //   ctx.fill()
  // }
  //
  // return <Canvas draw={draw} />
  
  return (
    <div>
      <h1>Fanorona Board Game</h1>
      <FanoronaBoard />
    </div>
  );
}

export default App