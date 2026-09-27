import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Geometry from './components/Geometry'

const App = () => {
  return (
    <Canvas>
      <pointLight intensity={2}/>
      <OrbitControls />
      <Geometry />
    </Canvas>
  )
}

export default App
