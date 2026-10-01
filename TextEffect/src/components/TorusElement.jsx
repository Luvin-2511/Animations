import { MeshTransmissionMaterial, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { useControls } from 'leva'

const TorusElement = () => {
  const meshRef = useRef(null)
  useFrame(() => {
    meshRef.current.rotation.x += 0.005
    meshRef.current.rotation.y += 0.005
  })

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 3, step: 0.05 },
    transmission: { value: 1, min: 0, max: 3, step: 0.05 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.05 },
    chromaticAberration: { value: 1.2, min: 0, max: 3, step: 0.05 },
    backside:{value:true}
  })
  return (
    <>
      <mesh ref={meshRef}>
        <torusGeometry args={[1.1, 0.6, 12, 32]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <Text fontSize={1.5} fontWeight={600} position={[0, 0, -1]}>
        Hello World
      </Text>
    </>
  )
}

export default TorusElement
