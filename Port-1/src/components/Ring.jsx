import React, { useRef, useState } from 'react'
import Card from './Card'
import { useFrame } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Ring = () => {
  const radius = 3
  const offset = 10
  const ringRef = useRef(null)
  const cardHeight = 3
  const images = [
    'https://picsum.photos/id/10/800/600',
    'https://picsum.photos/id/11/800/600',
    'https://picsum.photos/id/12/800/600',
    'https://picsum.photos/id/13/800/600',
    'https://picsum.photos/id/14/800/600',
    'https://picsum.photos/id/15/800/600',
    'https://picsum.photos/id/16/800/600',
    'https://picsum.photos/id/17/800/600',
    'https://picsum.photos/id/18/800/600',
    'https://picsum.photos/id/19/800/600'
  ]

  const ringLength = cardHeight * images.length
  console.log(ringLength)

  useFrame((_, delta) => {
    ringRef.current.rotation.y -= delta * 0.75
  })

  useGSAP(() => {
    gsap.to(ringRef.current.position, {
      y: -(ringLength / 3) + 1,
      duration: 9.5,
      repeat: -1,
      ease: 'none'
    })
  }, [])

  const doubleImg = [...images, ...images]
  return (
    <group ref={ringRef}>
      {doubleImg.map((_, idx) => {
        const angle = (idx / radius) * Math.PI
        return (
          <Card
            cardHeight={cardHeight}
            key={idx}
            position={[
              Math.sin(angle) * radius,
              idx * 1.5 - offset,
              Math.cos(angle) * radius
            ]}
            rotation={angle}
          />
        )
      })}
    </group>
  )
}

export default Ring
