import React, { Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Earth from './Earth'
import * as THREE from 'three'

function Browse3d() {

  function Rig() {
    const { camera, mouse } = useThree()
    const vec = new THREE.Vector3()
    return useFrame(() => (
      camera.position.lerp(vec.set(- mouse.x * 2, - mouse.y * 2, 10), 0.02)
      ))
  }

  return (
    <Canvas>
      <Rig />
      <Suspense fallback={null}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Earth scale={[0.05, 0.05, 0.05]} position-x={0} rotation-y={0} rotation-z={0} rotation-x={0}/>
      </Suspense>
    </Canvas>
  )
}

export default Browse3d