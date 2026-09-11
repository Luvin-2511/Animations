import { DoubleSide } from "three"

const Plane = ({ position ,rotationY}) => {
  return (
    <>
      <mesh position={position} rotation={[0,rotationY-300,0]}>
        <planeGeometry args={[1.5, 2]} />
        <meshStandardMaterial color={'red'} side={DoubleSide}/>
      </mesh>
    </>
  )
}

export default Plane
