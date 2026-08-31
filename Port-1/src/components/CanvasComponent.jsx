import { Canvas } from '@react-three/fiber'
import React from 'react'
import Ring from './Ring'

const CanvasComponent = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7]
      }}
      style={{
        height: '100%',
        width: '100%'
      }}
    >
      <ambientLight intensity={1} />
      <pointLight intensity={1} />
      <Ring />
    </Canvas>
  )
}

export default CanvasComponent
