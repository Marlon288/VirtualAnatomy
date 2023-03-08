import React from "react";
import ModelViewer from "./BoneModel";

function App() {
  return(
    <>
      <ModelViewer scale="10" modelPath={"/cube.glb"} />
      <button>Change Layer</button>
      <button>Settings</button> 
    </>
  );
}

export default App;
