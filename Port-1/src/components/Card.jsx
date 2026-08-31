import React, { useRef } from 'react'
import { DoubleSide } from 'three'
import vertexShader from '../shaders/vertex.glsl?raw'
import fragmentShader from '../shaders/fragment.glsl?raw'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

const Card = ({ position, rotation, cardHeight }) => {
  const materialRef = useRef(null)
  useFrame((state, delta) => {
    materialRef.current.uniforms.uTimer.value = state.clock.getElapsedTime()
    materialRef.current.uniforms.uVelocity.value = delta * 0.75
  })

  return (
    <mesh
      position={position}
      rotation={[0, rotation, 0]}
      onPointerOver={() => {
        gsap.to(materialRef.current.uniforms.uHover, {
          value: 1,
          duration: 0.6
        })
      }}
      onPointerOut={() => {
        gsap.to(materialRef.current.uniforms.uHover, {
          value: 0,
          duration: 0.6
        })
      }}
      onPointerMove={e => {
        const localX = (e.uv.x - 0.5) * 2
        const localY = (e.uv.y - 0.5) * cardHeight
        materialRef.current.uniforms.uRippleOrigin.value.set(localX, localY)
      }}
    >
      <planeGeometry args={[2, cardHeight, 20, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTimer: {
            value: 0
          },
          uVelocity: {
            value: 0
          },
          uHover: {
            value: 0
          },
          uRippleOrigin: {
            value: new THREE.Vector2(0, 0)
          }
        }}
        color={'red'}
        side={DoubleSide}
      />
    </mesh>
  )
}

export default Card
