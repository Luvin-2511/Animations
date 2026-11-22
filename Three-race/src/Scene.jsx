import { Canvas, useFrame } from '@react-three/fiber'
import { Instance, Instances, KeyboardControls, OrbitControls, useGLTF, useKeyboardControls } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react';
import {  CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';

const Actors = () => {
    const ballRef = useRef(null)
    const truckRef = useRef(null)
    const camTarget = useRef(new Vector3())
    const heading = useRef(0)
    const { scene: truckModel } = useGLTF('./models/vehicle-truck-red.glb');
    const { scene: trackModelStraight } = useGLTF('./models/track-straight.glb');
    const { scene: trackModelCorner } = useGLTF('./models/track-corner.glb');
    const trackMeshStraight = trackModelStraight.getObjectByProperty('isMesh', true)
    const trackMeshCorner = trackModelCorner.getObjectByProperty('isMesh', true)
    const track = [
        {
            type: 'straight',
            x: 0,
            z: 0,
            rotation: [0, 0, 0],
        },
        {
            type: 'straight',
            x: 0,
            z: 10,
            rotation: [0, 0, 0],
        },
        {
            type: 'straight',
            x: 0,
            z: 20,
            rotation: [0, 0, 0]
        },
        {
            type: 'straight',
            x: 0,
            z: 30,
            rotation: [0, 0, 0]
        },
        {
            type: 'corner',
            x: 0,
            z: 40,
            rotation: [0, Math.PI, 0]
        },
        {
            type: 'straight',
            x: 10,
            z: 40,
            rotation: [0, Math.PI / 2, 0]
        },
        {
            type: 'straight',
            x: 20,
            z: 40,
            rotation: [0, Math.PI / 2, 0]
        },
        {
            type: 'corner',
            x: 30,
            z: 40,
            rotation: [0, -Math.PI / 2, 0]
        },
        {
            type: 'straight',
            x: 30,
            z: 30,
            rotation: [0, 0, 0]
        },
        {
            type: 'straight',
            x: 30,
            z: 20,
            rotation: [0, 0, 0]
        },
        {
            type: 'straight',
            x: 30,
            z: 10,
            rotation: [0, 0, 0]
        },
        {
            type: 'straight',
            x: 30,
            z: 0,
            rotation: [0, 0, 0]
        },
        {
            type: 'corner',
            x: 30,
            z: -10,
            rotation: [0, 0, 0]
        },
        {
            type: 'straight',
            x: 20,
            z: -10,
            rotation: [0, Math.PI / 2, 0]
        },
        {
            type: 'straight',
            x: 10,
            z: -10,
            rotation: [0, Math.PI / 2, 0]
        },
        {
            type: 'corner',
            x: 0,
            z: -10,
            rotation: [0, Math.PI / 2, 0]
        },
    ]
    const [, get] = useKeyboardControls()
    useFrame((state, delta) => {
        const { up, down, left, right } = get()
        const body = ballRef.current
        if (!body || !truckRef.current) return

        const turn = (left ? 1.4 : 0) - (right ? 1.4 : 0)
        heading.current += turn * delta
        const x = Math.sin(heading.current)
        const y = Math.cos(heading.current)
        const throttle = (up ? 1 : 0) - (down ? 1 : 0)
        body.applyImpulse({
            x: x * throttle * delta * 50,
            y: 0,
            z: y * throttle * delta * 50
        }, true)
        const t = body.translation()
        truckRef.current.position.set(t.x, t.y - 1, t.z)
        truckRef.current.rotation.y = heading.current
        camTarget.current.set(t.x + 9.27, t.y + 9.18, t.z + 9.27)
        state.camera.position.lerp(camTarget.current, 1 - Math.exp(-5 * delta))
        state.camera.lookAt(t.x, t.y, t.z)
    })

    useEffect(() => {
        truckModel.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })
    }, [truckModel]);

    return (
        <>
            <Suspense>
                <Physics debug timeStep="vary">
                    <RigidBody
                        ref={ballRef}
                        position={[0, 5, 0]}
                        colliders="ball"
                        linearDamping={0.5}
                        angularDamping={3}
                        ccd
                        friction={1}
                    >
                        <mesh >
                            <sphereGeometry  args={[0.5, 16, 16]} />
                            <meshStandardMaterial color={"red"} />
                        </mesh>
                    </RigidBody>
                    <primitive ref={truckRef} scale={0.5} object={truckModel} />
                    <group position={[0, -3, 0]}>
                        <RigidBody position={[0, 0, 0]} type='fixed' colliders={false}>
                            <CuboidCollider args={[210, 0.5, 100]}
                                position={[15, -.5, 15]}
                                friction={0.4}
                                restitution={0.1}
                            />
                            <Instances
                                geometry={trackMeshStraight.geometry}
                                material={trackMeshStraight.material}
                                limit={100}
                                receiveShadow
                                castShadow
                            >
                                {track.filter(item => item.type === 'straight').map((item, i) => (
                                    <Instance
                                        key={i}
                                        position={[item.x, 0, item.z]}
                                        rotation={item.rotation}
                                    />
                                ))}
                            </Instances>
                            <Instances
                                geometry={trackMeshCorner.geometry}
                                material={trackMeshCorner.material}
                                limit={100}
                                receiveShadow
                            >
                                {track.filter(item => item.type === 'corner').map((item, i) => (
                                    <Instance
                                        key={i}
                                        position={[item.x, 0, item.z]}
                                        rotation={item.rotation}
                                    />
                                ))}
                            </Instances>
                        </RigidBody>
                    </group>
                </Physics>
            </Suspense>
        </>
    )
}

const Scene = () => {
    return (
        <KeyboardControls map={[
            { name: 'up', keys: ['ArrowUp', 'KeyW'] },
            { name: 'down', keys: ['ArrowDown', 'KeyS'] },
            { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
            { name: 'right', keys: ['ArrowRight', 'KeyD'] }
        ]}>
            <Canvas shadows camera={
                {
                    fov: 40,
                    position: [9.27, 9.18, 9.27]
                }
            }>
                <color attach="background" args={["#adb2ba"]} />
                <fog attach="fog" args={["#adb2ba", 20, 60]} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={1}
                    castShadow
                />
                <hemisphereLight />
                <Actors />
            </Canvas>
        </KeyboardControls>
    )
}

export default Scene