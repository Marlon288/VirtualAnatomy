import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Shoulder from "./Shoulder";

function BoneModel() {
  return(
    <>
      <Canvas className="canvas">
        <OrbitControls enableZoom={true}/>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[-2,5,2]} intensity={1}/>
        <Suspense fallback={null}>
          <Shoulder/>
        </Suspense>
      </Canvas>
    </>
  );
}

export default BoneModel;