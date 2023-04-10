import React, { useState } from "react";
import BoneModel from "./components/BoneModelHandler"
import Cog from "./components/Cog";
import Layer from "./components/Layer";



function App() {
  const [resetPosition, setResetPosition] = useState(false);

  const handleResetPosition = () => {
    setResetPosition(true);
    console.log("APP");
    setTimeout(function(){
      setResetPosition(false);
    }, 500); 
  };

  return( 
    <>
      <BoneModel resetPosition={resetPosition}/>
      <Cog onResetPosition={handleResetPosition}/>
      <Layer/>
    </>
  );
}

export default App;
 