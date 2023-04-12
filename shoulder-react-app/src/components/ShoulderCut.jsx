/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ShoulderCut.gltf
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function ShoulderCut({ visibility, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/ShoulderCut.gltf')
  const { actions } = useAnimations(animations, group)
  console.log(visibility + "Test")
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {visibility == 1 && (
            <mesh
              name="Skin"
              geometry={nodes.Skin.geometry}
              material={materials['Skin TXT']}
              rotation={[Math.PI / 2, 0, 0]}
            />
          )}
        {visibility <= 2 && (
          <mesh
            name="Muscle"
            geometry={nodes.Muscle.geometry}
            material={materials['Muscle TXT']}
            rotation={[Math.PI / 2, 0, 0]}
          />
        )}
        {visibility <= 3 && (
          <>
            <mesh
              name="Bone"
              geometry={nodes.Bone.geometry}
              material={materials['Bone TXT']}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <mesh
              name="Ligaments"
              geometry={nodes.Ligaments.geometry}
              material={materials['Ligmant TXT']}
              rotation={[Math.PI / 2, 0, 0]}
            />
          </>
        )}
        
        
      </group>
    </group>
  )
}

useGLTF.preload('/ShoulderCut.gltf')

export default (props) => (
  <ShoulderCut {...props}/>
)
