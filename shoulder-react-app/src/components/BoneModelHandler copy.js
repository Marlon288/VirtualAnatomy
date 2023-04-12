import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls,PerspectiveCamera  } from "@react-three/drei";
import Shoulder from "./Shoulder";


const startingPosition = [0, 0, 500]; // Set the desired starting position [x, y, z]
const cameraFov = 50; // Set the desired camera field of view (zoom)


function BoneModel(resetPosition) {
  const cameraRef = useRef();
  const modelRef = useRef();

  useEffect(() => {
    if (resetPosition) {
      if(cameraRef.current) {
        cameraRef.current.position.set(...startingPosition); // Set position to (0, 0, 40)
        
      }
      if(modelRef.current){
        modelRef.current.position.set(0, 0, 0); // Set position to (0, 0, 40)
      }
    }

  }, [resetPosition]);


 
  return(
    <>
      <Canvas className="canvas">
        
        <group ref={modelRef}>
        <PerspectiveCamera makeDefault fov={cameraFov} position={startingPosition} ref={cameraRef} />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            rotateSpeed={1} // Decrease the sensitivity of camera rotation
            zoomSpeed={0.5} // Decrease the sensitivity of camera zoom
            panSpeed={1} // Decrease the sensitivity of camera panning
            minDistance={10}
            maxDistance={40}
            maxZoom={200}
          />
          <ambientLight intensity={0.5}/>
          <directionalLight position={[-2,5,2]} intensity={1}/>
          <group>
            <mesh position={[0,7,0]}>
              <Shoulder/>
            </mesh>
          </group>
        </group>
      </Canvas>
    </>
  );
}

export default BoneModel;