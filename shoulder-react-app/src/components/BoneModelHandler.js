import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Vector2, Raycaster } from "three";
import ShoulderCut from "./ShoulderCut";

const startingPosition = [0, 0, 500]; // Set the desired starting position [x, y, z]
const cameraFov = 50; // Set the desired camera field of view (zoom)

function getMeshObjects(group) {
  if(!group) return;
  const meshes = [];
  group.traverse((object) => {
    if (object.isMesh) {
      meshes.push(object);
    }
  });
  return meshes;
}

function throttle(func, wait) {
  let lastCalled = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCalled >= wait) {
      lastCalled = now;
      func.apply(this, args);
    }
  };
}


 /* 
 Not in use right now, because it is too cpu intensive 
 function handleCanvasMouseMove(event) {
    // Calculate normalized device coordinates (NDC) from the hovered point
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    // Update the raycaster object with the NDC coordinates and the camera
    raycaster.setFromCamera(mouse, camera);
    const meshObjects = getMeshObjects(modelRef.current);

    // Intersect the clicked point with the 3D model
    const intersects = raycaster.intersectObjects(meshObjects, true);


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
  */
  
  const InteractiveModel = React.memo(function InteractiveModel({ setSelectedObject, visibility, resetPosition }) {
    const modelRef = useRef();
    const { camera } = useThree();
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    const [prevSelectedObject, setPrevSelectedObject] = useState(null);
    const meshObjects = useMemo(() => modelRef.current && getMeshObjects(modelRef.current), [modelRef.current]);

    useEffect(() => {
      if (resetPosition && prevSelectedObject && prevSelectedObject.material && prevSelectedObject.material.emissive) {
        prevSelectedObject.material.emissive.set(0x000000);
        prevSelectedObject.material.emissiveIntensity = 0;
        setSelectedObject(null);
        setPrevSelectedObject(null);
      }
    }, [resetPosition]);
  

    const handleCanvasClick = useCallback(throttle((event) => {
      // Calculate normalized device coordinates (NDC) from the clicked point
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // Update the raycaster object with the NDC coordinates and the camera
      raycaster.setFromCamera(mouse, camera);
    
      // Intersect the clicked point with the 3D model
      const intersects = raycaster.intersectObjects(meshObjects, true);
      const visibleIntersects = intersects.filter(intersect => {
        if(visibility >= 2 && intersect.object.UserData.name === "Skin") return false;
        else if(visibility >= 3 && intersect.object.material.name === "Muscle TXT") return false;
        else if(visibility >= 4 && intersect.object.material.name === "Ligmant TXT")return false;
        else return true;
      });
    
      if (prevSelectedObject && prevSelectedObject.material && prevSelectedObject.material.emissive) {
        prevSelectedObject.material.emissive.set(0x000000);
        prevSelectedObject.material.emissiveIntensity = 0;
      }
    
      if (visibleIntersects.length > 0) {
        const selected = visibleIntersects[0].object;
        // Clone the material and assign it to the selected mesh
        if (selected.material && selected.material.emissive) {
          selected.material = selected.material.clone();
          
          if(selected.material.name === "Ligmant TXT") {
            selected.material.emissive.set(0xFF0000);
            selected.material.emissiveIntensity = 3;
          }
          else {
            selected.material.emissive.set(0x00FF00);
            selected.material.emissiveIntensity = 0.1;
          }
        }
    
        setSelectedObject(selected);
        setPrevSelectedObject(selected);
      } else {
        prevSelectedObject.material.emissive.set(0x000000);
        prevSelectedObject.material.emissiveIntensity = 0;
        setSelectedObject(null);
        setPrevSelectedObject(null);
      }
    }, 500), [camera, meshObjects, setSelectedObject, setPrevSelectedObject, prevSelectedObject]);
    
    return (
      <group ref={modelRef} onClick={handleCanvasClick}>
        <mesh position={[0, 4, 0]}>
          <ShoulderCut visibility={visibility} />
        </mesh>
      </group>
    );
  }); 

const BoneModelChild = React.memo(function BoneModelChild({ resetPosition, setSelectedObject, visibility }) {
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
      <Canvas className="canvas" >
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
});

const BoneModel = React.memo(function BoneModel({ resetPosition, visibility }) {
  const [selectedObject, setSelectedObject] = useState(null);
  
  return (
  <div>
    <BoneModelChild visibility={visibility} resetPosition={resetPosition} setSelectedObject={setSelectedObject} />
    {selectedObject && (
      <div className="tooltip">
        <h3>{selectedObject.UserData.name}</h3>
        <p dangerouslySetInnerHTML={{ __html: selectedObject.UserData.prop }}></p>
      </div>  
    )}
  </div>
  );
});


export default BoneModel;
