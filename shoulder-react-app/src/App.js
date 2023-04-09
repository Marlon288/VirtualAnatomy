import React, { useState } from "react";
import {Canvas} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BoneModel from "./components/BoneModelHandler"
import Cog from "./components/Cog";
import Layer from "./components/Layer";



function App() {
  const [resetPosition, setResetPosition] = useState(false);

  const handleResetPosition = () => {
    setResetPosition(true);
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
 