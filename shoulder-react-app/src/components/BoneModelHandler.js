import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Shoulder from "./Shoulder";
import { Vector2, Raycaster } from "three";
import ShoulderCut from "./ShoulderCut";

const startingPosition = [0, 0, 500]; // Set the desired starting position [x, y, z]
const cameraFov = 50; // Set the desired camera field of view (zoom)

function InteractiveModel({ setSelectedObject, visibility, resetPosition}) {
  const modelRef = useRef();
  const { camera } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const [prevSelectedObject, setPrevSelectedObject] = useState(null);
  useEffect(() => {
    if (resetPosition && prevSelectedObject && prevSelectedObject.material && prevSelectedObject.material.emissive) {
      prevSelectedObject.material.emissive.set(0x000000);
      prevSelectedObject.material.emissiveIntensity = 0;
      setSelectedObject(null);
      setPrevSelectedObject(null);
    }
  }, [resetPosition]);

  function handleCanvasMouseMove(event) {
    // Calculate normalized device coordinates (NDC) from the hovered point
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    // Update the raycaster object with the NDC coordinates and the camera
    raycaster.setFromCamera(mouse, camera);
  
    // Intersect the hovered point with the 3D model
    const intersects = raycaster.intersectObjects(modelRef.current.children, true);
    


    // Reset emissive properties of all objects in the model
    modelRef.current.traverse((object) => {
      if (object.material && object.material.emissive) {
        object.material.emissive.set(0x000000);
        object.material.emissiveIntensity = 0;
      }
    });
  
    // If an object was hovered, update the emissive properties of the object
    if (intersects.length > 0) {
      const hovered = intersects[0].object;
      if (hovered.material && hovered.material.emissive) {
        hovered.material.emissive.set(0x555555); // Set the emissive color to a dark gray
        hovered.material.emissiveIntensity = 1; // Set the emissive intensity
      }
    }
  }
  
  
  
  
  function handleCanvasClick(event) {
    // Calculate normalized device coordinates (NDC) from the clicked point
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    // Update the raycaster object with the NDC coordinates and the camera
    raycaster.setFromCamera(mouse, camera);
  
    // Intersect the clicked point with the 3D model
    const intersects = raycaster.intersectObjects(modelRef.current.children, true);
  
    if (prevSelectedObject && prevSelectedObject.material && prevSelectedObject.material.emissive) {
      prevSelectedObject.material.emissive.set(0x000000);
      prevSelectedObject.material.emissiveIntensity = 0;
    }
    if (intersects.length > 0) {
      const selected = intersects[0].object;
      setSelectedObject(selected);
      setPrevSelectedObject(selected); // Store the selected object as the previous one
      if (selected.material && selected.material.emissive) {
        selected.material.emissive.set(0x00FF00); // Set the emissive color to a lighter gray
        selected.material.emissiveIntensity = 1; // Set the emissive intensity
      }
    } else {
      setSelectedObject(null);
    }
  }
  

  return (
    <group ref={modelRef} onClick={handleCanvasClick}>
      <mesh position={[0, 7, 0]}>
        <ShoulderCut visibility={visibility}/>
      </mesh>
    </group>
  );
}

function BoneModelChild({ resetPosition, setSelectedObject, visibility }) {
  console.log(visibility + "BoneModelChild");
  const cameraRef = useRef();
  const modelRefChild = useRef();
  useEffect(() => {
    if (resetPosition) {
      if (cameraRef.current) {
        cameraRef.current.position.set(...startingPosition); // Set position to (0, 0, 40)
      }
      if (modelRefChild.current) {
        modelRefChild.current.position.set(0, 0, 0); // Set position to (0, 0, 40)
      }
    }
  }, [resetPosition]);

  return (
    <>
      <Canvas className="canvas">
        <PerspectiveCamera makeDefault fov={cameraFov} position={startingPosition} ref={cameraRef} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          rotateSpeed={1} // Decrease the sensitivity of camera rotation
          zoomSpeed={10} // Decrease the sensitivity of camera zoom
          panSpeed={1} // Decrease the sensitivity of camera panning
          minDistance={10}
          maxDistance={50}
          minZoom={50}
          maxZoom={10}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <InteractiveModel resetPosition={resetPosition} visibility={visibility} setSelectedObject={setSelectedObject} />
      </Canvas>
    </>
  );
}

function BoneModel({ resetPosition, visibility }) {
  console.log(visibility + "BoneModel");
  const [selectedObject, setSelectedObject] = useState(null);
  return (
  <div>
    <BoneModelChild visibility={visibility} resetPosition={resetPosition} setSelectedObject={setSelectedObject} />
    {selectedObject && (
      <div className="tooltip">
        <h3>{selectedObject.name}</h3>
        <p>{selectedObject.userData.description} Here is a very cool description of the part of the bone</p>
      </div>
    )}
  </div>
  );
  }
  

export default BoneModel;
