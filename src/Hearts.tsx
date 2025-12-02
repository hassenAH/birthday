// src/Hearts.tsx
import * as THREE from 'three'
import React, { Suspense, useRef, useState, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, Detailed, Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField, ToneMapping } from '@react-three/postprocessing'
import type { LOD, Mesh } from 'three'

type HeartProps = {
    index: number
    z: number
    speed: number
}

type HeartsProps = {
    speed?: number
    count?: number
    depth?: number
    easing?: (x: number) => number
}

function Heart({ index, z, speed }: HeartProps) {
    const ref = useRef<LOD>(null!)
    const { viewport, camera } = useThree()
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])

    const gltf = useGLTF('/heart.glb') as any
    const { nodes } = gltf

    // find first mesh in the GLTF
    const baseMesh = useMemo(() => {
        const values = Object.values(nodes || {}) as any[]
        return values.find((v): v is Mesh => v && v.isMesh)
    }, [nodes])

    if (!baseMesh) return null

    const [data] = useState(() => ({
        y: THREE.MathUtils.randFloatSpread(height * 2),
        x: THREE.MathUtils.randFloatSpread(2),
        spin: THREE.MathUtils.randFloat(8, 12),
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI
    }))

    useFrame((state, dt) => {
        const lod = ref.current
        if (!lod) return

        if (dt < 0.1) {
            lod.position.set(
                index === 0 ? 0 : data.x * width,
                (data.y += dt * speed),
                -z
            )
        }

        lod.rotation.set(
            (data.rX += dt / data.spin),
            Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
            (data.rZ += dt / data.spin)
        )

        const limit = height * (index === 0 ? 4 : 1)
        if (data.y > limit) {
            data.y = -limit
        }
    })

    return (
        <Detailed ref={ref} distances={[0, 65, 80]}>
            {[
                <mesh
                    key="lod-0"
                    geometry={baseMesh.geometry}
                    material={baseMesh.material}
                />,
                <mesh
                    key="lod-1"
                    geometry={baseMesh.geometry}
                    material={baseMesh.material}
                />,
                <mesh
                    key="lod-2"
                    geometry={baseMesh.geometry}
                    material={baseMesh.material}
                />
            ] as any}
        </Detailed>
    )
}

useGLTF.preload('/heart.glb')

const Hearts: React.FC<HeartsProps> = ({
    speed = 1,
    count = 80,
    depth = 80,
    easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2))
}) => {
    return (
        <div className="hearts-fullscreen">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}
            >
                <color attach="background" args={['#ff8ccf']} />

                <spotLight
                    position={[10, 20, 10]}
                    penumbra={1}
                    decay={0}
                    intensity={3}
                    color="#ff4d88"
                />

                <Suspense fallback={null}>
                    {Array.from({ length: count }, (_, i) => (
                        <Heart
                            key={i}
                            index={i}
                            z={Math.round(easing(i / count) * depth)}
                            speed={speed}
                        />
                    ))}

                    <Environment preset="sunset" />

                    <EffectComposer multisampling={0} enableNormalPass={false}>
                        <DepthOfField
                            target={[0, 0, 60]}
                            focalLength={0.4}
                            bokehScale={6}
                            height={700}
                        />
                        <ToneMapping />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Hearts
