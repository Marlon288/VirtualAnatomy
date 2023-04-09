import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls,PerspectiveCamera  } from "@react-three/drei";
import Shoulder from "./Shoulder";


const startingPosition = [0, 0, 40]; // Set the desired starting position [x, y, z]
const cameraFov = 50; // Set the desired camera field of view (zoom)


function BoneModel(resetPosition ) {
  /*const modelRef = useRef();
  useEffect(() => {
    if (resetPosition) {
      modelRef.current.position.set(0, 0, 40); // Set position to (0, 0, 40)
      // Add any other reset logic here
    }
  }, [resetPosition]);
  <mesh ref={modelRef}>
  </mesh>*/
  return(
    <>
      <Canvas className="canvas">
        <PerspectiveCamera makeDefault fov={cameraFov} position={startingPosition} />
        <OrbitControls enableZoom={true}/>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[-2,5,2]} intensity={1}/>
        
          <Shoulder/>
        
      </Canvas>
    </>
  );
}

export default BoneModel;