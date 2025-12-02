// src/pages/ScrollGallery.tsx
import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
    Preload,
    ScrollControls,
    Scroll,
    useScroll,
    Image as ImageImpl
} from '@react-three/drei'
import type { Mesh, Group } from 'three'
import Overlay from '../layout/Overlay'

// Just use React.ComponentProps instead of JSX.*
type CustomImageProps = React.ComponentProps<typeof ImageImpl> & {
    c?: THREE.Color
}

const Image: React.FC<CustomImageProps> = ({ c = new THREE.Color(), ...props }) => {
    const ref = useRef<Mesh | null>(null)
    const [hovered, setHovered] = useState(false)

    useFrame(() => {
        const mesh = ref.current
        if (!mesh) return

        const material: any = mesh.material
        if (!material?.color) return

        material.color.lerp(c.set(hovered ? 'white' : '#ccc'), hovered ? 0.4 : 0.05)
    })

    return (
        <ImageImpl
            ref={ref}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            {...props}
        />
    )
}

const Images: React.FC = () => {
    const { width, height } = useThree((state) => state.viewport)
    const data = useScroll()
    const group = useRef<Group | null>(null)

    useFrame(() => {
        const g = group.current
        if (!g) return

        const children = g.children as any[]
        if (children.length < 7) return

        children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3
        children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3
        children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3
        children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2
        children[4].material.zoom = 1 + data.range(1.25 / 3, 1 / 3) / 1
        children[5].material.zoom = 1 + data.range(1.8 / 3, 1 / 3) / 3
        children[5].material.grayscale = 1 - data.range(1.6 / 3, 1 / 3)
        children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3
    })

    return (
        <group ref={group}>
            <Image position={[-0.6, 0, 0.6]} scale={[2, 2]} url="/img1.jpeg" />
            <Image position={[-0.6, -height, 1]} scale={[2, 2]} url="/trip4.jpeg" />
            <Image position={[0.6, -height, 1.5]} scale={[1, 2]} url="/img8.jpeg" />
            <Image position={[-2.3, -height, 2]} scale={[1, 3]} url="/trip2.jpeg" />
            <Image position={[-0.6, -height, 3]} scale={[1, 2]} url="/image31.jpeg" />

            <Image position={[0, -height * 1.5, 2.5]} scale={[1.5, 3]} url="/img61.jpeg" />
            <Image
                position={[0, -height * 2 - height / 4, 0]}
                scale={[width, height / 2]}
                url="/img7.jpeg"
            />
        </group>
    )
}

const ScrollGalleryPage: React.FC = () => {
    return (
        <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
                <ScrollControls damping={4} pages={3}>
                    <Scroll>
                        <Images />
                    </Scroll>
                    <Scroll html>
                        <Overlay />
                        <h1 style={{ position: 'absolute', top: '198.5vh', left: '0.5vw', fontSize: '40' }}>You mean every thing to me BouBa. Nheeebeek </h1>

                    </Scroll>
                </ScrollControls>
                <Preload />
            </Suspense>
        </Canvas>
    )
}

export default ScrollGalleryPage
