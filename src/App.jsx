import React, { useEffect } from 'react'
import FanoronaBoard from './component0/FanoronaBoard';

import "./App.css";

function App() {

  
  return (
    <div id='App'> 
          <div
            style={{
              textAlign: `center`,
              paddingTop: `80px`,
            }}>
            <button id='btn_restart' 
                    style={{
                      backgroundColor: `#89fe98`,
                      padding: `10px`,
                    }}
            onClick={() => window.location.reload()}>
              RESTART
            </button>
          </div>
      <FanoronaBoard />
    </div>
  );
}

export default App