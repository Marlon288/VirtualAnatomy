import React, { useState } from "react";
import BoneModel from "./components/BoneModelHandler"
import Cog from "./components/Cog";
import Layer from "./components/Layer";



function App() {
  const [resetPosition, setResetPosition] = useState(false);
  const [visibility, setVisibility] = useState(1);

  const handleResetPosition = () => {
    setResetPosition(true);
    console.log("APP");
    setTimeout(function(){
      setResetPosition(false);
    }, 500); 
  };


  const toggleVisibility = () => {
    if (visibility === 3) {
      setVisibility(1);
    } else {
      setVisibility(visibility + 1);
    }
  };

  return( 
    <>
      <BoneModel visibility={visibility} resetPosition={resetPosition}/>
      <Cog onResetPosition={handleResetPosition}/>
      <Layer onToggleVisibility={toggleVisibility}/>
    </>
  );
}

export default App;
 