import React from "react";
import ModelViewer from "./BoneModel";

function App() {
  return(
    <>
      <ModelViewer scale="40" modelPath={"./cube.gltf"} />
      <button>Change Layer</button>
      <button>Settings</button>
    </>
  );
}

export default App;
