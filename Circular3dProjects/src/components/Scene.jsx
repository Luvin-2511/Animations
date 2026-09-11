import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Plane from './Plane'

const Scene = () => {
  const arr = Array(40).fill(0)
  const radius = 7
  return (
    <Canvas>
      <ambientLight intensity={2} />
      <OrbitControls />
      {arr.map((_, idx) => {
        const goldenAngle = Math.PI * (3 - Math.sqrt(5))
        const y = 1 - (idx / (arr.length - 1)) * 2
        const radiusAtY = Math.sqrt(1 - y * y)
        const theta = idx * goldenAngle
        const angle = 1 - (idx / (arr.length - 1)) * Math.PI
        const x = Math.cos(theta) * radius * radiusAtY
        const z = Math.sin(theta) * radius * radiusAtY
        const posY = y * radius
        return <Plane position={[x, posY, z]} rotationY={-theta} />
      })}
    </Canvas>
  )
}

export default Scene
