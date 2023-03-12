import React, { Suspense } from "react";
import {Canvas} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BoneModel from "./components/BoneModelHandler"

function App() {
  return(
    <>
      <BoneModel/>
    </>
  );
}

export default App;
