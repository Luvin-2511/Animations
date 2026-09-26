import React, { useMemo, useRef } from 'react'
import vertexShader from '../shader/vertex.glsl?raw'
import fragmentShader from '../shader/fragment.glsl?raw'
import { useFrame } from '@react-three/fiber'

const Geometry = () => {
  const meshMaterialRef = useRef(null)
  const uniforms = useMemo(() => {
    return ({
      uTimer: { value: 0 }
    })
  }, [])

  useFrame(state => {
    meshMaterialRef.current.uniforms.uTimer.value = state.clock.elapsedTime
  })

  return (
    <mesh>
      <planeGeometry args={[3, 3, 30, 30]} />
      <shaderMaterial
        ref={meshMaterialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={true}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default Geometry
