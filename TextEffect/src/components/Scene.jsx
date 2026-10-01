import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import TorusElement from './TorusElement'

const Scene = () => {
  return (
    <Canvas>
      <pointLight intensity={5} position={[0, 4, 3]} />
      <Environment preset='city' />
      <TorusElement />
      <OrbitControls />
    </Canvas>
  )
  
}
export default Scene
